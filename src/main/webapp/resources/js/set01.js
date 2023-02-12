let windowPeople=[];

window.onload = openstart;
function openstart()
{
    let strparam = getParameter();

    if(false != strparam)
    {
        windowPeople= strparam;
        reseting();
    }
    else
    {
        //첫 세팅 화면 진입 경우, 초기값을 배열로 삼는다
        for(let i=0; i<13; i++)
        {
            let compNum = i+1;
            let componentId = "nameinput0"+compNum;
            if(compNum>9)
            {
                componentId="nameinput"+compNum;
            }
            windowPeople.push(document.getElementById(componentId).value);
        }
    }
}

function reseting()
{
    let people = [...windowPeople];

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

    windowPeople = [...people];
}

function retrunSetVal()
{
    let peopleArr =[];
    for(let i=0; i<13; i++)
    {
        let compNum = i+1;
        let componentId = "nameinput0"+compNum;
        if(compNum>9)
        {
            componentId="nameinput"+compNum;
        }
        let getValue = document.getElementById(componentId).value;
        windowPeople[i] = getValue;

    }
    peopleArr = [...windowPeople];
    window.opener.setPeoples(peopleArr);
    window.close();
}

function ending()
{
    window.close();
}

function getParameter()
{
    let url = decodeURI(location.search);
    let urls = url.split("&");
    let firstedChek = urls[0].split("=");
    if(firstedChek[1]==true || firstedChek[1]=="true")
    {
        return false;
    }
    else
    {
        urls = urls[1].split("=");
        let urlsArr=urls[1].split("^^");
        return urlsArr;
    }

    return false;
}
