$(document).ready(function () {
    // Contact Us
    $(".contact-select-blk, .document-select-blk").hide();
    $(".inquiry-item").on("change", function () {
        $(".contact-select-blk").toggle(this.value === "contactus");
        $(".document-select-blk").toggle(this.value === "request");
    });

    // Select Data Change
    var time = new Date();
    var currentYear = time.getFullYear();
    var currentMonth = time.getMonth() + 1;

    //function isLeapYear(year) {
    //    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    //}

    const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    function getDaysInMonth(month, year) {
        if (month === 2 && isLeapYear(year)) {
            return 29;
        }

        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysInMonth[month - 1];
    }

    for (var i = currentYear; i >= 1950; i--) {
        $("#year").append('<option value="' + i + '">' + i + "年</option>");
    }

    for (var i = 1; i <= 12; i++) {
        $("#month").append('<option value="' + i + '">' + i + "月</option>");
    }

    function updateMonthOptions(selectedYear) {
        var limitMonth = (selectedYear === currentYear) ? currentMonth : 12;

        $("#month").empty();

        for (var i = 1; i <= limitMonth; i++) {
            $("#month").append('<option value="' + i + '">' + i + "月</option>");
        }
    }

    function updateDayOptions() {
        var selectedMonth = parseInt($("#month").val());
        var selectedYear = parseInt($("#year").val());
        var daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

        // Get the current date
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1; 
        var currentDay = currentDate.getDate();
e
        if (selectedYear === currentYear && selectedMonth === currentMonth) {
            daysInMonth = Math.min(daysInMonth, currentDay); // Limit to today's date
        }

        $("#day").empty();

        for (var i = 1; i <= daysInMonth; i++) {
            $("#day").append('<option value="' + i + '">' + i + "日</option>");
        }
    }

    updateDayOptions();

    $("#month, #year").on("change", function () {
        updateDayOptions();
    });

    $("#year").on("change", function () {
        var selectedYear = parseInt($("#year").val());
        updateMonthOptions(selectedYear);
        updateDayOptions();
    });
});
