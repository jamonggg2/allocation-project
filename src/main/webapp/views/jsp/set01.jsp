<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/main.css" rel="stylesheet" type="text/css">
    <script src="/js/mainLogic.js"></script>
    <title>대상설정</title>
</head>
<body>
    <div>
        <div class="textTi"><spen>대상 설정</spen></div>
        <div class="textTiSub"><spen>업무를 배치할 사람의 이름을 설정한다</spen></div>
        <button class="reBtnS" id="endBtn">종료</button>
        <button class="reBtnS" id="resetBtn" onclick="reseting()">재배치</button>
    </div>

    <div>
        <form name="inputForm" id="inputForm" methodh="get" onsubmit="retrunSetVal()">
            <button class="startBtnS" id="mainBtn" onclick="retrunSetVal()">설정완료</button>

            <div id="indexNum01">
                <span>01 </span>
                <input id="nameinput01" class="nameinput" type="text" value="이름1">
                <span>(723)</span>
                <br><br>

                <span>02 </span>
                <input id="nameinput02" class="nameinput" type="text" value="이름2">
                <span>(723)</span>
                <br><br>

                <span>03 </span>
                <input id="nameinput03" class="nameinput" type="text" value="이름3">
                <span>(723)</span>
                <br><br>

                <span>04 </span>
                <input id="nameinput04" class="nameinput" type="text" value="이름4">
                <span>(723)</span>
                <br><br>

                <span>05 </span>
                <input id="nameinput05" class="nameinput" type="text" value="이름5">
                <span>(723)</span>
                <br><br>

                <span>06 </span>
                <input id="nameinput06" class="nameinput" type="text" value="이름6">
                <span>(723)</span>
                <br><br>

                <span>07 </span>
                <input id="nameinput07" class="nameinput" type="text" value="이름7">
                <span>(723)</span>
                <br><br>

                <span>08 </span>
                <input id="nameinput08" class="nameinput" type="text" value="이름8">
                <span>(723)</span>
            </div>

            <div id="indexNum02">
                <span>09 </span>
                <input id="nameinput09" class="nameinput" type="text" value="이름9">
                <span>(813)</span>
                <br><br>

                <span>10 </span>
                <input id="nameinput10" class="nameinput" type="text" value="이름10">
                <span>(813)</span>
            <br><br><br>
                <span>11 </span>
                <input id="nameinput11" class="nameinput" type="text" value="이름11">
                <span>(822)</span>
                <br><br>

                <span>12 </span>
                <input id="nameinput12" class="nameinput" type="text" value="이름12">
                <span>(822)</span>
                <br><br>

                <span>13 </span>
                <input id="nameinput13" class="nameinput" type="text" value="이름13">
                <span>(822)</span>
            </div>
            

        </form>

    </div>
</body>
<script>

    
    const people = new Array(13);

    window.onload = openstart;
    function openstart()
    {
        reseting();
    }

    function reseting()
    {

        let strparam = getParameterByName('param');
        alert(strparam);
        let parmArray = strparam.split("^^");
        alert(parmArray);
        //people = parmArray;

        for(let i=0; i<people.length; i++)
        {
            let compNum = i+1;
            let componentId = "nameinput0"+compNum;
            if(compNum>9)
            {
                componentId="nameinput"+compNum;
            }
            document.getElementById(componentId).value = people[i];   
        }
    }

    function retrunSetVal()
    {
        let peopleArr =[];
        for(let i=0; i<people.length; i++)
        {
            let compNum = i+1;
            let componentId = "nameinput0"+compNum;
            if(compNum>9)
            {
                componentId="nameinput"+compNum;
            }
            opener.peopleNames[i] = document.getElementById(componentId).value;   
        }
        peopleArr = people;
        window.opener.setPeople(peopleArr);
        window.close();s
    }

    function getParameterByName(name) {
        let url = window.location.search;
        url = JSON.parse(url);
        const urlParams = url.searchParams;ß
        
        let param =urlParams.get(name);
        return param
    }




</script>
<style>

    #indexNum01 {
        top: 250px;
        left: 60px;
        position: absolute;
    }

    #indexNum02 {
        top: 250px;
        left: 350px;
        position: absolute;
    }

    #mainBtn {
        top: 150px;
        left: 50px;
    }
  
    #endBtn {
        top: 50px;
        left: 50px;
    }
  
    #resetBtn {
        top: 90px;
        left: 50px;
    }
  
</style>

</html>