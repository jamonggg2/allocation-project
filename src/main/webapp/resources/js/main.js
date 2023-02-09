    //테스트 입력값
    //0달=3월 ~, 10달=1월, 12달=2월
    const fixMonth = new Map([[2,6],[3,1],[4,0],[8,6],[10,7],[7,7],[9,10],[1,1]]);
    const fixShift = new Map([[2,9],[3,2],[4,5],[8,9],[10,6],[7,3],[9,10],[1,1]]);

    const peopleNames= ['이름01','이름02','이름03','이름04','이름05','이름06','이름07','이름08','이름09','이름10','이름11','이름12','이름13'];
    let nameSetyetfirst = true;
    let fixSetyetfirst = true;

    function openPopUpSetPeopel(val)
    {
        var options = 'width=800px, height=800px, top=30, left=30, resizable=no, scrollbars=yes, location=no, status=no';

        if(val==0)
    {
        let url01 = "set01";
        if(nameSetyetfirst)
    {
        url01 = url01 + "?first=true";
        nameSetyetfirst = false;
    }
        else
    {
        let strparam = encodeURI(peopleNames.join("^^"));
        url01 = url01 + "?"+"first=false&" + "param="+strparam;
    }
        window.open(url01, "대상설정", options);


    }
        else if(val ==1)
    {
        let url02 = "set02";
        if(fixSetyetfirst)
    {
        url02 = url02 + "?first=true";
        let strparam = encodeURI(peopleNames.join("^^"));
        url02 = url02 + "&param="+strparam;
        fixSetyetfirst = false;
    }
        else
    {
        url02 = url02 + "?"+"first=false"
        let strparam = encodeURI(peopleNames.join("^^"));

        let monthsTmp = Array.from(fixMonth.keys());
        let shiftsTmp = Array.from(fixShift.keys());
        strparam = strparam + "&fixMonthKey=" + encodeURI(monthsTmp.join("^^"));
        strparam = strparam + "&fixShiftKey=" + encodeURI(shiftsTmp.join("^^"));

        monthsTmp = Array.from(fixMonth.values());
        shiftsTmp = Array.from(fixShift.values());
        strparam = strparam + "&fixMonthVal=" + encodeURI(monthsTmp.join("^^"));
        strparam = strparam + "&fixShiftVal=" + encodeURI(shiftsTmp.join("^^"));

        url02 = url02+ "param="+strparam;
    }
        window.open(url02, "픽스설정", options);
    }

    }

    //대상설정에서 온 이름값을 배열에 저장한다
    function setPeoples(arr)
    {
        for(let i=0;i<arr.length;i++)
    {
        peopleNames[i] = arr[i];
    }
    }

