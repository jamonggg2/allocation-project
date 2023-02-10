let fullArr;
const selectedInx = [0,0,0,0,0,0,0,0,1,1,2,2,2];

//9,10 은 보라매 11,12,13은 암센터이다ß

//13인*12달
const setPeople =
[
    [13,12,11,10,9,8,7,6,5,4,3,2],
    [1,13,12,11,10,9,8,7,6,5,4,3],
    [2,1,13,12,11,10,9,8,7,6,5,4],
    [3,2,1,13,12,11,10,9,8,7,6,5],
    [4,3,2,1,13,12,11,10,9,8,7,6],
    [5,4,3,2,1,13,12,11,10,9,8,7],
    [6,5,4,3,2,1,13,12,11,10,9,8],
    [7,6,5,4,3,2,1,13,12,11,10,9],
    [8,7,6,5,4,3,2,1,13,12,11,10],
    [9,8,7,6,5,4,3,2,1,13,12,11],
    [10,9,8,7,6,5,4,3,2,1,13,12],
    [11,10,9,8,7,6,5,4,3,2,1,13],
    [12,11,10,9,8,7,6,5,4,3,2,1]
];

const names = ['본원1','본원2','본원3', '본원4','본원5', '본원6', '본원7','본원8'];


//방식
//겹치지않는 랜덤이 아닌 전체 배열을 만든다
//픽스를 중심으로 랜덤으로 변경한다

function theSave() {

    //todo
    //설정에 따라서 이름, 시프트이름을 바꿀수있게
    //설정은 팝업으로?
    //열배치바꾸기 함수로 어케 뺄수없나 

    doit(selectedInx,fullArr);
    
}

function doit ()
{   
    let arr = [...setPeople];

    //분원값을 바꾼다
    arr = numTonumBunWons(arr);

    let cantChIndx =[];
    let allIndexArr =[0,1,2,3,4,5,6,7,8,9,10,11,12];
    let nameMap = new Map();
    let delmonthKey = Array.from(fixMonth.keys());

    //813, 822 분류 먼저 픽스값에 따라 차례를 바꾼다
    for(let i=8; i<arr.length ; i++)
    {
        let monthKey = Array.from(fixMonth.keys());
        //monthKey. indexOf(i)
        if(-1!=monthKey.indexOf(i)) //만약 픽스를 선택했으면
        {
            //setpeople배열에서 column을 픽스에 맞게 교체한다
            //자기배열 안에서 원하는 값을 가진 위치를 찾고, 그 위치와 맞교환한다
            let fixShiftVal = fixShift.get(i);
            let indexVa =0;
            while(true)
            {
                if(arr[i][indexVa]==fixShiftVal) 
                {
                    cantChIndx = allIndexArr.filter((value)=> !allIndexArr.includes(value));
                    if(!cantChIndx.includes(indexVa))
                    {
                        break;
                    }
                }
                else indexVa = indexVa+1;

                if(indexVa>arr[i].length)
                {
                    alert(monthKey[i]+"달에 "+fixShiftVal+"를 가질수 없습니다. 다른 사람과 겹칩니다");
                    break;
                }
            }

            if(indexVa<arr[i].length)
            {
                let swapedArr = swapColumns (arr,indexVa, fixMonth.get(i));
                arr = swapedArr;
                //alert(i +"은"+ fixMonth.get(i) +"을"+ fixShiftVal + "골랐습니다 : "+arr[i]);
                cantChIndx.push(indexVa);
                nameMap.set(i,peopleNames[i]);
                delmonthKey.splice(delmonthKey.indexOf(i), 1);
            } 

        }

        //배치되지 못한 픽스값이 있어...
        if(-1!=delmonthKey.indexOf(i))
        {
            //픽스하지 않는 사람과 맞교환한다
            let retrunVal =  swapRows(arr,8, arr.length ,i,monthKey);

            //교환불가!
            if(!retrunVal[0])
            {
                alert(fixMonth.get(i)+"달에 "+fixShiftVal+" 값을 가질수 없습니다. 다른 사람과 겹칩니다 fix");
            }
            else
            {
                cantChIndx.push(fixMonth.get(i));
                nameMap.set(retrunVal[1],peopleNames[i]);
                delmonthKey.splice(delmonthKey.indexOf(i), 1);
            }
        }
    }

    //813 822중 픽스를 고르지 않은 값들을 지정한다
    let monthKey = Array.from(fixMonth.keys());
    let alreadyinName = Array.from(nameMap.keys());
    let canNameIndexArr = [8,9,10,11,12,13];
    canNameIndexArr = canNameIndexArr.filter((value)=>!alreadyinName.includes(value));

    for(let i=8; i<arr.length ; i++)
    {
        if(-1==monthKey.indexOf(i) && !alreadyinName.includes(i)) //픽스값이 없고 아직 배치되지 않은 이름이면
        {
            let theName = peopleNames[i];
            nameMap.set(i,theName);
        }
    }

    //723사람들을 픽스쉽 기준으로 이름과 인덱스를 연결한다
    //만약 이미 선점된경우, 픽스달에 해당하는 열을 변경한다
    //모든 픽스를 처리한 후 남은 픽스에 대해서 랜덤으로 인덱스를 배정한다
    let fixbol = false;
    for(let i=0; i<8 ; i++)
    {
        let monthKey = Array.from(fixMonth.keys());
        let fixShiftVal = fixShift.get(i);
        let fixMonthVal =fixMonth.get(i);
        let nameArr = Array.from(nameMap.keys());
        let nonameArr = [0,1,2,3,4,5,6,7,8,9,10,11,12];
        nonameArr = nonameArr.filter((value)=>!nameArr.includes(value));

        if(-1!=monthKey.indexOf(i) || -1!=monthKey.indexOf("'"+i+"'")) //만약 픽스를 선택했으면
        {
            //픽스값을 가진 사람을 본인으로 한다
            let retrunVal01 = swapRowsWithFix(arr,0, 8,i,nonameArr,monthKey,fixMonthVal);

            //교환불가!
            if(!retrunVal01[0])
            {
                //열교환한다
                //픽스값 자체가 없는지 확인한 후, 없으면 있는 사람으로 열교환 한다
                let checkIndex = arr[i].indexOf(fixShiftVal);
                if(-1 == checkIndex)
                {
                    for(let z=0;z<nonameArr.length;z++)
                    {
                        if(-1 != arr[nonameArr[z]].indexOf(fixShiftVal))
                        {
                            arr = swapRowsOnetoOne(arr, nonameArr[z], i);
                        }
                    }
                }

                let indexVa =0;
                let countBol01=false;
                while(true)
                {
                    if(arr[i][indexVa]==fixShiftVal) 
                    {
                        cantChIndx = allIndexArr.filter((value)=> !allIndexArr.includes(value));
                        if(!cantChIndx.includes(indexVa))
                        {
                            countBol01=true;
                            break;
                        }
                    }
                    else indexVa = indexVa+1;

                    if(indexVa>arr[i].length)
                    {
                        alert((fixMonthVal+3)+"달에 "+fixShiftVal+"를 가질수 없습니다. 다른 사람과 겹칩니다");
                        break;
                    }
                }

                if(countBol01)
                {
                    let swapedArr = swapColumns (arr,indexVa, fixMonthVal);
                    arr = swapedArr;
                
                    cantChIndx.push(indexVa);
                    nameMap.set(i,peopleNames[i]);
                    delmonthKey.splice(delmonthKey.indexOf(i), 1);
                }

            }
            else
            {
                cantChIndx.push(fixMonthVal);
                nameMap.set(retrunVal01[1],peopleNames[i]);
                delmonthKey.splice(delmonthKey.indexOf(i), 1);
            }
        }

         //배치되지 못한 픽스값이 있어...
         if(-1!=delmonthKey.indexOf(i))
        {
            nonameArr = nonameArr.filter((value)=>!nameArr.includes(value));
            //맞교환한다
            let retrunVal = swapRowsWithFix(arr,0, 8,i,nonameArr, monthKey, delmonthKey.indexOf(i))
            //교환불가!
            if(!retrunVal[0])
            {
                //픽스값 자체가 없는지 확인한 후, 없으면 있는 사람으로 열교환 한다
                let checkIndex = arr[i].indexOf(fixShiftVal);
                if(-1 == checkIndex)
                {
                    for(let z=0;z<nonameArr.length;z++)
                    {
                        if(-1 != arr[nonameArr[z]].indexOf(fixShiftVal))
                        {
                            arr = swapRowsOnetoOne(arr, nonameArr[z], i);
                        }
                    }
                }
                let indexVa =0;
                let countBol01=false;
                while(true)
                {
                    if(arr[i][indexVa]==fixShiftVal) 
                    {
                        cantChIndx = allIndexArr.filter((value)=> !allIndexArr.includes(value));
                        if(!cantChIndx.includes(indexVa))
                        {
                            countBol01=true;
                            break;
                        }
                    }
                    else indexVa = indexVa+1;

                    if(indexVa>arr[i].length)
                    {
                        alert(fixMonthVal+"달에 "+fixShiftVal+"를 가질수 없습니다. 다른 사람과 겹칩니다");
                        break;
                    }
                }

                if(countBol01)
                {
                    let swapedArr = swapColumns (arr,indexVa, fixMonthVal);
                    arr = swapedArr;
                
                    cantChIndx.push(indexVa);
                    nameMap.set(i,peopleNames[i]);
                    delmonthKey.splice(delmonthKey.indexOf(i), 1);
                }
            }
            else
            {
                cantChIndx.push(fixMonth.get(i));
                nameMap.set(retrunVal[1],peopleNames[i]);
                delmonthKey.splice(delmonthKey.indexOf(i), 1);
            }
        }
    }

    for(let i=0; i<8 ; i++)
    {
        alreadyinName = Array.from(nameMap.keys());
        if(-1==monthKey.indexOf(i) && !alreadyinName.includes(i)) //픽스값이 없고 아직 배치되지 않은 이름이면
        {
            let theName = peopleNames[i];
            nameMap.set(i,theName);
        }
    }

    //번호와 본원문자를 연결한다
    let cngBonWon = [...arr];
    let makeRd = [0,1,2,3,4,5,6,7];
    //makeRd = shuffle(makeRd); //랜덤으로?
    
    let numToBonWon = new Map
    ([
        [1 , names[makeRd[0]]],
        [2 , names[makeRd[1]]],
        [3 , names[makeRd[2]]],
        [4 , names[makeRd[3]]],
        [5 , names[makeRd[4]]],
        [6 , names[makeRd[5]]],
        [7 , names[makeRd[6]]],
        [8 , names[makeRd[7]]],
    ]);

    for (let i = 0; i < cngBonWon.length; i++) 
    {
        for (let j = 0; j < cngBonWon[i].length; j++) 
        {
            let key = cngBonWon[i][j];
            if (numToBonWon.has(key)) 
            {
                cngBonWon[i][j] = numToBonWon.get(key);
            }
        }
    }

    //분원명을 연결한다
    let cngToStr = numToBunWons(cngBonWon);
    arr =[...cngToStr];

    let withNameMap = new Map();
    //이름번호 순으로 배열을 정렬한다
    for(let i=0;i<arr.length;i++)
    {
        let thename = nameMap.get(i);

        withNameMap.set(thename, arr[i]);
    }
    let sorWithNameMap = new Map([...withNameMap.entries()].sort());
    

    //testWriteMap(sorWithNameMap);
    testWriteTable(sorWithNameMap);
}

//제한없는 셔플
function shuffle(array) 
{
    for (let index = array.length - 1; index > 0; index--) 
    {
        // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
        const randomPosition = Math.floor(Math.random() * (index + 1));

        // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;

    }

    return array;
}


function testWrite(arr) {
    // 2차원 배열의 요소들을 하나씩 출력
    for (var i = 0; i < 13; i++) {
        document.write('<br />');
        for (var j = 0; j < 12; j++) {
            document.write(arr[i][j] + ', ');
        }
    }
}

function testWriteMap (map)
{
    for (let [key, value] of map) 
    {
        document.write('<br />');
        document.write(key + ': '+value);
    }
}

function testWriteTable(map)
{
    let table = '<table>';
    table += '<thead><tr><th>이름</th><th>3월</th><th>4월</th><th>5월</th><th>6월</th><th>7월</th>';
    table += '<th>8월</th><th>9월</th><th>10월</th><th>11월</th><th>12월</th><th>1월</th><th>2월</th></tr></thead>';
    table += '<tbody>';

    for (const [key, values] of map) 
    {
        table += '<tr><td>'+key+'</td>'

        for (let i = 0; i < values.length; i++) 
        {
            table += '<td>'+values[i]+'</td>';
        }

        table += '</tr>'
    }
    table += '</tbody></table>';
    document.body.innerHTML = table;
}


//분원값을 문자로 바꾼다
function numToBunWons(arr)
{
    //분원값을 바꾼다
    let cngBunWon = [...arr];

    let numToBunWon = new Map
    ([
        [9,'보라매'],
        [10,'암센터']
    ]);

    for (let i = 0; i < cngBunWon.length; i++) 
    {
        for (let j = 0; j < cngBunWon[i].length; j++) 
        {
            let vaules = cngBunWon[i][j];
            if(9 <=vaules && vaules<=13)
            {
                cngBunWon[i][j] = numToBunWon.get(vaules);
            }
        }
    }

    return cngBunWon;
}

    //분원값을 숫자로 바꾼다
    function numTonumBunWons(arr)
{
    //분원값을 9,10->9 , 11,12,13->10으로 바꾼다
    let cngBunWon = [...arr];

    let numToBunWon = new Map
    ([
        [10,9],[11,10],[12,10],[13,10]
        
    ]);

    for (let i = 0; i < cngBunWon.length; i++) 
    {
        for (let j = 0; j < cngBunWon[i].length; j++) 
        {
            let key = cngBunWon[i][j];
            if (numToBunWon.has(key)) 
            {
                cngBunWon[i][j] = numToBunWon.get(key);
            }
        }
    }

    return cngBunWon;
}

//행열을 바꾼다
function transXY (arr)
{   
    let transposedArray = [];
    for (let i = 0; i < arr[0].length; i++) 
    {
        transposedArray[i] = [];
        for (let j = 0; j < arr.length; j++) 
        {

            transposedArray[i][j] = arr[j][i];
        }
    }

    return transposedArray
}

//column값을 맞교환하기
function swapColumns (arr,swapCol01, swapCol02)
{
    let beforeSwap = [...arr];
    let afterSwap =[...arr];
    for (let i = 0; i < arr.length; i++) 
    {
        let temp = beforeSwap[i][swapCol01];
        afterSwap[i][swapCol01] = beforeSwap[i][swapCol02];
        afterSwap[i][swapCol02] = temp;
    }

    return afterSwap;

}

//픽스가 아닌 row로 맞교환
function swapRows(arr,startIndex, endindex,i,mothKeys)
{
    let needVal = fixShift.get(i);
    let newArr = [...arr];
    let peopleNum = i;
    let countBol=false;
    let cngPeople;

    for(let x=startIndex; x<endindex ; x++)
    {
        for(xx=0;xx<arr[0].length;xx++)
        {
            if(-1 == monthKey.indexOf(x))  //픽스가 아닌사람
            {
                if(arr[x][monthVal] == needVal)
                {
                    let tmp = [...arr[x]]; //바꿈당할사람
                    let tmp02 = [...arr[peopleNum]]; //바꿔질사람
                    arr[peopleNum] = tmp;
                    arr[x] = tmp02;
                    countBol=true;
                    cngPeople = x;
                    break;
                }
            }
            else
            {
                break;
            }
        }

        if(countBol) break;
    }

    return [countBol,cngPeople];
}

//픽스 상관없이 row로 맞교환가능한거 찾아서하기
function swapRowsWithFix(arr,startIndex, endindex,i,nonameArr, mothKeys, month)
{
    let monthKey = mothKeys;
    let needVal = fixShift.get(i);
    let needMon = month;
    let newArr = [...arr];
    let peopleNum = i;
    let countBol=false;
    let cngPeople;
    let noname = nonameArr;

    for(let x=startIndex; x<endindex ; x++)
    {

        if(-1 != noname.indexOf(x))  //이미 배정받지 않은사람
        {
            if(arr[x][needMon] == needVal)
            {
                let tmp = [...arr[x]]; //바꿈당할사람
                let tmp02 = [...arr[peopleNum]]; //바꿔질사람
                arr[peopleNum] = tmp;
                arr[x] = tmp02;
                countBol=true;
                cngPeople = peopleNum;
                break;
            }
        }

        if(countBol) break;
    }

    return [countBol,cngPeople];
}

//row 맞
function swapRowsOnetoOne (arr,swapRow01, swapRow02)
{
    let tmp = [...arr[swapRow01]]; //바꿈당할사람
    let tmp02 = [...arr[swapRow02]]; //바꿔질사람
    arr[swapRow02] = tmp;
    arr[swapRow01] = tmp02;
    return arr;
}

function serchSwapedIndex (arr, canIndex, fixmonth, fixshift)
{
    let canSwapColIndex =[...canIndex];
    let fixMonthVal = fixmonth;
    let fixShiftVarl = fixshift;
    let fullArrNow = [...arr];
    let indexVa = 0;
    let counter =0;

    while(true)
    {
        fullArrNow = swapColumns (fullArrNow,fixMonthVal, canSwapColIndex[0]);  
        counter = counter +1;
        if(fullArrNow[indexVa][fixMonthVal] == fixShiftVarl)
        {
            indexVa = i;
            break;
        }

        if(counter>30)
        {
            alert(fixMonthVal+"달에 "+fixShiftVarl+"를 가질수 없습니다. 다른 사람과 겹칩니다");
            return -1;
        }
    }

    return indexVa;
}



