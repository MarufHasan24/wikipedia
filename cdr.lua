local function main(frame)
	-- Callable from #invoke 
	local str = (frame.args[1] or frame:getParent().args[1]) or ''
        str = str:gsub('(০)', '0')
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
return {
    main = main
}