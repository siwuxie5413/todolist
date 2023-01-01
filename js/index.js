$(function () {
    load();
    $(".header h1 input").on("keydown", function (event) {
        if (event.keyCode == 13) {
            let local = getData();
            if ($(this).val() !== "") {
                local.push({content: $(this).val(), done: false});
                setData(JSON.stringify(local));
                load();
            }
        }

    });

    // let jsonobj = [{
    //     "name": "tom",
    //     "age": 27
    // }]
    // //将数组对象通过stringify转化为字符串，然后进行存储
    // localStorage.setItem("todotest", JSON.stringify(jsonobj));
    // //拿到的是字符串
    // console.log(localStorage.getItem("todotest"));
    // //通过parse将字符串转化为对象数组
    // console.log(JSON.parse(localStorage.getItem("todotest")));
    // let todolist_init=[]
    // localStorage.setItem("todolist",JSON.stringify(todolist_init));



    //获取本地数据
    function getData() {
        // localStorage.clear();
        let data = localStorage.getItem("todolist");
        console.log(data);
        if (data===null){
            return [];
        }else{
            return JSON.parse(data);
        }
        // if(data.toString()==="[object Object]"){
        //     return [];
        // }else{
        //     return JSON.parse(data);
        // }


        // console.log(JSON.parse(data));


    }

    //    保存数据
    function setData(data) {
        localStorage.setItem("todolist", data);
    }

//    渲染加载数据
    function load(){
        $("#todolist").empty();
        $("#donelist").empty();
        let data=getData();
        $.each(data,function(i,n){
            // console.log(n);
            if (n.done){
                $("#donelist").prepend("<li  CLASS='clear'><input type='checkbox' checked><p>"+n.content+"</p><a id="+i+" href='#'></a></li>");
            }else {
                $("#todolist").prepend("<li CLASS='clear'><input type='checkbox'><p>" + n.content + "</p><a id="+i+" href='#'></a></li>");
            }
            });
        let todolistlen=$("#todolist").children().length;
        let donelistlen=$("#donelist").children().length;
        console.log("length");
        console.log(todolistlen);

        $("section .count").html(todolistlen);
        $("section .count2").html(donelistlen);


    }


//    点击a删除li
    $("#todolist").on("click","a",function (){
        let index = $(this).attr("id");
        console.log("li 的index:"+index);
        let dat=getData();
        dat.splice(index,1);
        setData(JSON.stringify(dat));
        load();
    });

//    选择CheckBox更改done属性
    $("#todolist").on("click","input",function (){
        // alert(111);
        let index=$(this).siblings("a").attr("id");
        let data=getData();
        data[index].done=true;
        setData(JSON.stringify(data));
        load();
    });

//    donelist
    //    点击a删除li
    $("#donelist").on("click","a",function (){
        let index = $(this).attr("id");
        console.log("li 的index:"+index);
        let dat=getData();
        dat.splice(index,1);
        setData(JSON.stringify(dat));
        load();
    });

//    选择CheckBox更改done属性
    $("#donelist").on("click","input",function (){
        // alert(111);
        let index=$(this).siblings("a").attr("id");
        let data=getData();
        data[index].done=false;
        setData(JSON.stringify(data));
        load();
    });


});