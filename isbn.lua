--[[

This code is derived from the ISXN validation code at Module:Citation/CS1.  It allows validating ISBN,
ISMN, and ISSN without invoking a citation template.

]]

local p = {}


--[[--------------------------< E R R _ M S G _ S U P L _ T >--------------------------------------------------

error message supplements for check_isbn(); adapted from a similarly named table at Module:Citation/CS1/Configuration

]]

local err_msg_supl_t = {
	['char'] = 'অবৈধ অক্ষর',
	['check'] = 'চেকসাম',
	['form'] = 'অবৈধ ফর্ম',
	['group'] = 'অবৈধ গ্রুপ আইডি',
	['length'] = 'দৈর্ঘ্য',
	['prefix'] = 'অবৈধ উপসর্গ',
	}


--[[--------------------------< IS _ V A L I D _ I S X N >-----------------------------------------------------

ISBN-10 and ISSN validator code calculates checksum across all isbn/issn digits including the check digit. ISBN-13 is checked in check_isbn().
If the number is valid the result will be 0. Before calling this function, issbn/issn must be checked for length and stripped of dashes,
spaces and other non-isxn characters.

]]
--[[ is created by user:মোহাম্মদ মারুফ]]
local function translatenum(str)
	local str = str:gsub('(০)', '0')
	str = str:gsub('(১)', '1')
	str = str:gsub('(২)', '2')
	str = str:gsub('(৩)', '3')
	str = str:gsub('(৪)', '4')
	str = str:gsub('(৫)', '5')
	str = str:gsub('(৬)', '6')
	str = str:gsub('(৭)', '7')
	str = str:gsub('(৮)', '8')
	str = str:gsub('(৯)', '9')
	str = str:gsub('(জানুয়ারি)', 'January')
	str = str:gsub('(ফেব্রুয়ারি)', 'February')
	str = str:gsub('(মার্চ)', 'March')
	str = str:gsub('(এপ্রিল)', 'April')
	str = str:gsub('(মে)', 'May')
	str = str:gsub('(জুন)', 'June')
	str = str:gsub('(জুলাই)', 'July')
	str = str:gsub('(আগস্ট)', 'August')
	str = str:gsub('(সেপ্টেম্বর)', 'September')
	str = str:gsub('(অক্টোবর)', 'October')
	str = str:gsub('(নভেম্বর)', 'November')
	str = str:gsub('(ডিসেম্বর)', 'December')
	return str
end

local function is_valid_isxn (isxn_str, len)
	local temp = 0;
	isxn_str = { isxn_str:byte(1, len) };	-- make a table of byte values '0' → 0x30 .. '9'  → 0x39, 'X' → 0x58
	len = len+1;							-- adjust to be a loop counter
	for i, v in ipairs( isxn_str ) do		-- loop through all of the bytes and calculate the checksum
		if v == string.byte( "X" ) then		-- if checkdigit is X (compares the byte value of 'X' which is 0x58)
			temp = temp + 10*( len - i );	-- it represents 10 decimal
		else
			temp = temp + tonumber( string.char(v) )*(len-i);
		end
	end
	return temp % 11 == 0;					-- returns true if calculation result is zero
end


--[[--------------------------< IS _ V A L I D _ I S X N  _ 1 3 >----------------------------------------------

ISBN-13 and ISMN validator code calculates checksum across all 13 isbn/ismn digits including the check digit.
If the number is valid, the result will be 0. Before calling this function, isbn-13/ismn must be checked for length
and stripped of dashes, spaces and other non-isxn-13 characters.

]]

local function is_valid_isxn_13 (isxn_str)
	local temp=0;
	isxn_str = { isxn_str:byte(1, 13) };										-- make a table of byte values '0' → 0x30 .. '9'  → 0x39
	for i, v in ipairs( isxn_str ) do
		temp = temp + (3 - 2*(i % 2)) * tonumber( string.char(v) );				-- multiply odd index digits by 1, even index digits by 3 and sum; includes check digit
	end
	return temp % 10 == 0;														-- sum modulo 10 is zero when isbn-13/ismn is correct
end


--[[--------------------------< C H E C K _ I S B N >------------------------------------------------------------

Determines whether an ISBN string is valid.  Implements an ISBN validity check for {{ISBN}}, {{ISBNT}}, {{SBN}}, and
{{Format ISBN}}.

]]

local function check_isbn (isbn, frame)
	local isbn_str = translatenum(isbn);
	local function return_result (check, err_type)								-- local function to render the various error returns
		if not check then														-- <check> false when there is an error
			local template = ((frame.args.template_name and '' ~= frame.args.template_name) and frame.args.template_name) or nil;	-- get template name
			if not template then
				return '<span class="error" style="font-size:100%">&nbsp;কলিং টেমপ্লেটের template_name প্যারামিটার প্রয়োজন</span>';
			end

			local out_t = {'<span class="error" style="font-size:100%">'};		-- open the error message span
			table.insert (out_t, '&nbsp;{{[[টেমপ্লেট:');		-- open 'template' markup; open wikilink with Template namespace
			table.insert (out_t, template);										-- template name wikilink
			table.insert (out_t, '|');											-- its pipe
			table.insert (out_t, template);										-- wikilink label
			table.insert (out_t, ']]}} এ প্যারামিটার ত্রুটি:&nbsp;');								-- close wikilink; close 'template' markup
			table.insert (out_t, err_type);										-- type of isbn error
			table.insert (out_t, '</span>')										-- close the error message span
			if 0 == mw.title.getCurrentTitle().namespace then					-- categorize only when this template is used in mainspace
				local category = table.concat ({'[[বিষয়শ্রেণী:আইএসবিএন ত্রুটিসহ পাতা]]'});
				table.insert (out_t, category);
			end
			return table.concat (out_t);										-- make a big string and done
		end
	return '';																	-- no error, return an empty string
	end

	if nil ~= isbn_str:match ('[^%s-0-9X]') then
		return return_result (false, err_msg_supl_t.char);						-- fail if isbn_str contains anything but digits, hyphens, or the uppercase X
	end

	local id = isbn_str:gsub ('[%s-]', '');										-- remove hyphens and whitespace

	local len = id:len();
 
	if len ~= 10 and len ~= 13 then
		return return_result (false, err_msg_supl_t.length);					-- fail if incorrect length
	end

	if len == 10 then
		if id:match ('^%d*X?$') == nil then										-- fail if isbn_str has 'X' anywhere but last position
			return return_result (false, err_msg_supl_t.form);									
		end
		if id:find ('^63[01]') then												-- 630xxxxxxx and 631xxxxxxx are (apparently) not valid isbn group ids but are used by amazon as numeric identifiers (asin)
			return return_result (false, err_msg_supl_t.group);					-- fail if isbn-10 begins with 630/1
		end
		return return_result (is_valid_isxn (id, 10), err_msg_supl_t.check);	-- pass if isbn-10 is numerically valid (checksum)
	else
		if id:match ('^%d+$') == nil then
			return return_result (false, err_msg_supl_t.char);					-- fail if ISBN-13 is not all digits
		end
		if id:match ('^97[89]%d*$') == nil then
			return return_result (false, err_msg_supl_t.prefix);				-- fail when ISBN-13 does not begin with 978 or 979
		end
		if id:match ('^9790') then
			return return_result (false, err_msg_supl_t.group);					-- group identifier '0' is reserved to ISMN
		end
		return return_result (is_valid_isxn_13 (id), err_msg_supl_t.check);		-- pass if isbn-10 is numerically valid (checksum)
	end
end


--[[--------------------------< C H E C K _ I S M N >------------------------------------------------------------

Determines whether an ISMN string is valid.  Similar to isbn-13, ismn is 13 digits begining 979-0-... and uses the
same check digit calculations.  See http://www.ismn-international.org/download/Web_ISMN_Users_Manual_2008-6.pdf
section 2, pages 9–12.

]]

local function check_ismn (id, error_string)
	local text;
	local valid_ismn = true;
	id = translatenum(id);
	id=id:gsub( "[%s-–]", "" );													-- strip spaces, hyphens, and endashes from the ismn

	if 13 ~= id:len() or id:match( "^9790%d*$" ) == nil then					-- ismn must be 13 digits and begin 9790
		valid_ismn = false;
	else
		valid_ismn=is_valid_isxn_13 (id);										-- validate ismn
	end

	return valid_ismn and '' or error_string
end


--[[--------------------------< I S S N >----------------------------------------------------------------------

Validate and format an issn.  This code fixes the case where an editor has included an ISSN in the citation but has separated the two groups of four
digits with a space.  When that condition occurred, the resulting link looked like this:

	|issn=0819 4327 gives: [http://www.worldcat.org/issn/0819 4327 0819 4327]  -- can't have spaces in an external link
	
This code now prevents that by inserting a hyphen at the issn midpoint.  It also validates the issn for length and makes sure that the checkdigit agrees
with the calculated value.  Incorrect length (8 digits), characters other than 0-9 and X, or checkdigit / calculated value mismatch will all cause a check issn
error message.

]]

local function check_issn(ids, error_string)
	local id = translatenum(ids);
	local issn_copy = id;		-- save a copy of unadulterated issn; use this version for display if issn does not validate
	local text;
	local valid_issn = true;

	if not id:match ('^%d%d%d%d%-%d%d%d[%dX]$') then
		return error_string;
	end
	id=id:gsub( "[%s-–]", "" );									-- strip spaces, hyphens, and endashes from the issn

	if 8 ~= id:len() or nil == id:match( "^%d*X?$" ) then		-- validate the issn: 8 digits long, containing only 0-9 or X in the last position
		valid_issn=false;										-- wrong length or improper character
	else
		valid_issn=is_valid_isxn(id, 8);						-- validate issn
	end

	return valid_issn and '' or error_string
end


------------------------------< E N T R Y   P O I N T S >--------------------------------------------------====

function p.check_isbn(frame)
	return check_isbn(frame.args[1] or frame:getParent().args[1], frame)
end

function p.check_ismn(frame)
	return check_ismn(frame.args[1] or frame:getParent().args[1], frame.args['error'] or frame:getParent().args['error'] or 'error')
end

function p.check_issn(frame)
	return check_issn(frame.args[1] or frame:getParent().args[1], frame.args['error'] or frame:getParent().args['error'] or 'error')
end

return p
