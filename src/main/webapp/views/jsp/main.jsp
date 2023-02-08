<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link href="https://fonts.googleapis.com/css?family=Helvetica&display=swap" rel="stylesheet" /> -->
    <link href="../../resources/css/main.css" rel="stylesheet" type="text/css">
    <script src="../../resources/js/mainLogic.js"></script>
    <title>Document</title>
</head>
<body>
    <div class="background">
        <div class="title"><spen>레지던트 업무배치 프로그램</spen></div>
        <button class="startBtn" id="mainBtn" onclick="theSave()">설정하기</button>
        <button class="reBtn" id="setbtn01" onclick="openPopUpSetPeopel(0)">대상설정</button>
        <button class="reBtn" id="setbtn02" onclick="openPopUpSetPeopel(1)">파트고정</button>
        <button class="reBtn" id="resetBtn">재배치</button>
    </div>
</body>
<script type="text/javascript">
//테스트 입력값
//0달=3월 ~, 10달=1월, 12달=2월
const fixMonth = new Map([[2,6],[3,1],[4,0],[8,6],[10,7],[7,7],[9,10],[1,1]]);
const fixShift = new Map([[2,9],[3,2],[4,5],[8,9],[10,6],[7,3],[9,10],[1,1]]);

    const peopleNames= ['이름00','이름01','이름02','이름03','이름04','이름05','이름06','이름07','이름08','이름09','이름10','이름11','이름12'];

    function openPopUpSetPeopel(val)
    {
        var options = 'width=800px, height=800px, top=30, left=30, resizable=no, scrollbars=yes, location=no, status=no';

        if(val==0)
        {
            let url01 = "set01.jsp";
            let strparam = peopleNames.join("^^");
            url01 = url01 + "?"+"param ="+strparam;
            window.open(url01, "대상설정", options);


        }
        else if(val ==1)
        {
            window.open("set02.jsp", "픽스설정", options);
        }
          
    }

    function setPeoples(arr)
    {
        for(let i=0;i<arr.length;i++)
        {
            peopleNames[i] = arr[i];
        }
    }

</script>
<style>
  #setbtn01 {
      top: 224px;
      left: 300px;
  }

  #setbtn02 {
      top: 224px;
      left: 800px;
  }

  #resetBtn {
  top: 764px;
  left: 79px;
  }

  #mainBtn{
    top: 403px;
    left: 474px;
  }

</style>
</html>