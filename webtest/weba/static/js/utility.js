function displayDateTH(date) {
    var monthNamesThai = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม"];
    var dayNames = ["วันอาทิตย์ที่", "วันจันทร์ที่", "วันอังคารที่", "วันพุทธที่", "วันพฤหัสบดีที่", "วันศุกร์ที่", "วันเสาร์ที่"];


    var d = date?date: new Date();

    return (dayNames[d.getDay()] + "  " + d.getDate() + " " + monthNamesThai[d.getMonth()] + "  " + d.getFullYear());
}

function displayDateTHShort(date) {
    var monthNamesThai = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม"];
    var dayNames = ["วันอาทิตย์ที่", "วันจันทร์ที่", "วันอังคารที่", "วันพุทธที่", "วันพฤหัสบดีที่", "วันศุกร์ที่", "วันเสาร์ที่"];


    var d = date?date: new Date();

    return (d.getDate() + " " + monthNamesThai[d.getMonth()] + "  " + d.getFullYear());
}

function displayDateEN(date) {

    var monthNamesEng = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var dayNamesEng = ['Sunday', 'Monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var d = date?date:new Date();

    return (dayNamesEng[d.getDay()] + " " + d.getDate() + "  " + monthNamesEng[d.getMonth()] + "  " + d.getFullYear());
}