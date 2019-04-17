let data = {
    "7 смертных грехов":{
        "1 опенинг":"audio/7 deadly sins/7 deadly sins 1op.mp3",
        "1 оп на русском":"audio/7 deadly sins/7 deadly sins 1 op rus.mp3",
        "1 оп длинная версия":"audio/7 deadly sins/7 deadly sins audio 5.mp3",
        "2 опенинг":"audio/7 deadly sins/7 deadly sins 2op.mp3",
        "1 аудио":"audio/7 deadly sins/7 deadly sins audio 4.mp3"
    },
    "атака титанов":{
        "1 опенинг":"audio/attack on titan/attack on titan 1op.mp3",
        "3 опенинг":"audio/attack on titan/attack on titan 3op.mp3",
        "3 оп на русском":"audio/attack on titan/attack on titan 3op ru.mp3",
        "1 аудио":"audio/attack on titan/attack on titan fB.mp3",
    },
    "мастер меча онлайн":{
        "1 опенинг":"audio/sao/sao 1 op.mp3",
        "1 оп на русском":"audio/sao/sao 1op rus.mp3",
        "2 опенинг":"audio/sao/sao 2op.mp3",
        "1 аудио":"audio/sao/sao audio 1.mp3",

    },
    "этот прекрасный мир":{
        "1 опенинг":"audio/konosuba/konosuba 1op.mp3",
        "2 опенинг":"audio/konosuba/konosuba 2 op.mp3",
        "1 аудио":"audio/konosuba/konosuba audio1.mp3",
    },
    "тетрадь смерти":{
        "1 опенинг":"audio/ts/ts 1op.mp3",
        "1 оп на русском":"audio/ts/ts 1op(rus).mp3",
        "1 аудио":"audio/ts/ts audio1.mp3",
        "2 аудио":"audio/ts/ts audio2.mp3",

    }
};
window.onload = function () {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            let li = $("<li></li>")
            li.appendTo("#list");
            li.text(key);
        }
    }

    let selectAnime;
    let audio;
    let klavaReady = [0,0];
    $("#accept").prop('disabled', true);

    $("div input[type ='text']").on("input",searchElement);

    
    $("#accept").on("click",()=>{
        $("#klava2").remove();
        $("#musicName").remove();
        $( "<div id = 'musicName'></div>" ).insertAfter( "#animeName" );
        $( "<ul id = 'musicList'></ul>" ).appendTo( $("#musicName"));
        for (const key in data[selectAnime]) {
            if (data[selectAnime].hasOwnProperty(key)) {
                const element = data[selectAnime][key];
                console.log(key);
                $( "<li>"+key+"</li>" ).appendTo( $("#musicList"));
            }
        }
        $( "<input type = 'text' id = 'audioName'></input>" ).appendTo( $("#musicName"));
        $( "<a id = 'audioAccept'>подтвердить</a>" ).appendTo( $("#musicName"));
        $("<div id ='klava2'>клавеатура 2</div>").appendTo("body");
        $("#klava2").on("click",()=>{
            if (klavaReady[0] != 1) {
                if (klavaReady[1] == 0) {
                    getConsole($("#audioName"));
                    klavaReady[1] = 1
                }
                else {
                    $("#box11").remove();
                    klavaReady[1] = 0;
                }
            }
        });
        $("#audioAccept").prop('disabled', true);
        $("div input[type ='text']").on("input",searchElement);
        $("#audioAccept").on("click",createAudio);
    });


    function searchElement() {
        let parent = $(this).parent();//сам element div
        if (parent != $("#animeName") && parent != $("#musicName")) {
            if (klavaReady[0] == 1) {
                parent = $("#animeName");
            }
            else if (klavaReady[1] == 1) {
                parent = $("#musicName");
            }
        }
        let textButt = parent.find("input[type = 'text']");//поле ввода в div
        let butt = parent.find("input[type = 'button']")//кнопка подтверждения
        let musicNameSelect;
        let li = parent.find("li");
        butt.prop('disabled', true);
        li.removeClass("select");
        // console.log($(textButt[0]).val());
        let name = $(textButt).val();
        if (name == "" || name == " ") {
            return;
        }
        let reg = new RegExp(name,"i");
        for (let index = 0; index < li.length; index++) {
            if ($(li[index]).text().search(reg) != -1) {
                $(li[index]).addClass("select");
                selectAnime = $(li[index]).text();
            }
        }
        musicNameSelect = parent.find(".select");
        console.log(musicNameSelect);
        if (musicNameSelect.length == 1) {
            butt.prop('disabled', false);
        }
    }


    function createAudio() {
        $("#audioFile").remove();
        $("#disk").remove();
        $("#audioContant").remove();
        $("audio").remove();
        $("audio").remove();
        $("<div id = 'audioContant'></div>").appendTo("#box");
        $("<i class='fas fa-volume-up' id = 'volumeAdd'></i>").appendTo("#audioContant");
        $("<i class='fas fa-volume-down' id = 'volumeRemove'></i>").appendTo("#audioContant");
        $("<i class='fas fa-play' id = 'icoPlayOrPause'></i>").appendTo("#audioContant");
        $("<div id = 'disk'></div>").appendTo("#box");
        $("<div id = 'audioFile'></div>").appendTo("#box");
        $("<audio controls = 'controls' preload = 'auto'></audio>").appendTo("#audioFile");
        let selectAnimeName = $($("div")[1]).find(".select").text();
        let selectMusicName = $($("div")[2]).find(".select").text();
        let selectAudioFile = data[selectAnimeName][selectMusicName];
        console.log(selectAnimeName);
        $("audio").attr("src",selectAudioFile);
        audio = $("audio")[0];
        $("#icoPlayOrPause").on("click",playPause);
        $("#volumeAdd").on("click",()=>{$("audio")[0].volume += 0.1;console.log($("audio")[0].volume)});
        $("#volumeRemove").on("click",()=>{$("audio")[0].volume -= 0.1;console.log($("audio")[0].volume)});
        $("#audioName").on("click",()=>{
            getConsole($("#audioName"));
        });
    }


    function playPause() {
        if ($("#disk").hasClass("musicPlay")) {
            $("#icoPlayOrPause").addClass("fa-play");
            $("#icoPlayOrPause").removeClass("fa-pause");
            audio.pause();
            $("#disk").removeClass("musicPlay");
        }
        else {
            audio.play();
            $("#icoPlayOrPause").addClass("fa-pause");
            $("#icoPlayOrPause").removeClass("fa-play");
            $("#disk").addClass("musicPlay");
        }
    }
    function getConsole(inp) {
        let arr = [
            ["й","ц","у","к","е","н","г","ш","щ","з"],
            ["ф","ы","в","а","п","р","о","л","д","ж"],
            ["я","ч","с","м","и","т","ь","б","ю","del"],
            ["space"]
        ]
        $("#box11").remove();
        $("<div id = 'box11'></div>").appendTo($("#box"));
        for (let index = 0; index < arr.length; index++) {
            $("<tr></tr>").appendTo($("#box11"));
            for (let i = 0; i < arr[index].length; i++) {
                if (arr[index][i] != "space") {
                    $("<td>"+arr[index][i]+"</td>").appendTo($($("tr")[index]));
                }
                else {
                    $("<td id ='space'>"+arr[index][i]+"</td>").appendTo($($("tr")[index]));
                }
            }
        }
        $("td").on("click",(event)=> {
            let target = event.target;
            if (target.textContent != "space" && target.textContent != "del") {
                inp.val(inp.val()+target.textContent);
            }
            else if (target.textContent == "space") {
                inp.val(inp.val()+" ");
            }

            else { 
                let chenger = "";
                for (let i = 0; i < inp.val().length-1; i++) {
                    chenger += inp.val()[i];
                }
                inp.val(chenger);
            }
        });
        $("#box11").on("click",searchElement);
    }
    $("#klava1").on("click",()=>{
        if (klavaReady[1] != 1) {
            if (klavaReady[0] == 0) {
                getConsole($("#name"));
                klavaReady[0] = 1
            }
            else {
                $("#box11").remove();
                klavaReady[0] = 0;
            }
        }
    });
    $("#klava2").on("click",()=>{
        if (klavaReady[0] != 1) {
            if (klavaReady[1] == 0) {
                getConsole($("#audioName"));
                klavaReady[1] = 1
            }
            else {
                $("#box11").remove();
                klavaReady[1] = 0;
            }
        }
    });


}
