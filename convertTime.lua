-- Return input text after converting any en digits and month names.

local en_digits = {
	['0'] = '০',
	['1'] = '১',
	['2'] = '২',
	['3'] = '৩',
	['4'] = '৪',
	['5'] = '৫',
	['6'] = '৬',
	['7'] = '৭',
	['8'] = '৮',
	['9'] = '৯',
}

local en_months = {
	['January'] = 'জানুয়ারি',
	['january'] = 'জানুয়ারি',
	['February'] = 'ফেব্রুয়ারি',
	['february'] = 'ফেব্রুয়ারি',
	['March'] = 'মার্চ',
	['march'] = 'মার্চ',
	['April'] = 'এপ্রিল',
	['april'] = 'এপ্রিল',
	['May'] = 'মে',
	['may'] = 'মে',
	['June'] = 'জুন',
	['june'] = 'জুন',
	['July'] = 'জুলাই',
	['july'] = 'জুলাই',
	['August'] = 'আগস্ট',
	['august'] = 'আগস্ট',
	['September'] = 'সেপ্টেম্বর',
	['september'] = 'সেপ্টেম্বর',
	['October'] = 'অক্টোবর',
	['october'] = 'অক্টোবর',
	['November'] = 'নভেম্বর',
	['november'] = 'নভেম্বর',
	['December'] = 'ডিসেম্বর',
	['december'] = 'ডিসেম্বর',
}

local function _main(input)
	-- Callable from another module.
	input = input or ''
	input = (input:gsub('%a+', en_months):gsub('%d', en_digits))
    input = input:gsub('(seconds?)', 'সেকেন্ড')
    input = input:gsub('(minutes?)', 'মিনিট')
    input = input:gsub('(hours?)', 'ঘন্টা')
    input = input:gsub('(days?)', 'দিন')
    input = input:gsub('(weeks?)', 'সপ্তাহ')
    input = input:gsub('(months?)', 'মাস')
    input = input:gsub('(years?)', 'বছর')
    return input
end

local function main(frame)
	-- Callable from #invoke or from a template.
	return _main(frame.args[1] or frame:getParent().args[1])
end

return { main = main, _main = _main }
