/**
 * Created by Anuradha on 8/22/2014.
 */






$(document).on("pageshow", "#mainPage", function (event) {
    $.mobile.loading('show');
    var myDvrs = localStorage.getItem("myDvrs");
    myDvrs = JSON.parse(myDvrs);
    if(myDvrs == null)
        myDvrs = [];

    var $page = $("#mainPage");
    // Get the content area element for the page.
    var $content = $page.children(":jqmData(role=content)");

    // Build the list of urls.
    var markup = "<ul data-role='listview' data-split-icon='delete'>";
    for (var i=0; i<myDvrs.length; i++) {
        var dvrUrl="http://"+myDvrs[i].Url+":"+myDvrs[i].Port+"/nobody/mobile480.htm?Login="+myDvrs[i].User+"?Password="+myDvrs[i].Pass;
        markup = markup + "<li><a href='" + dvrUrl + "'>" + myDvrs[i].Name + "</a>" + "<a href='#deldvr?name=" + myDvrs[i].Name + "' data-rel='dialog'>Delete</a></li>";
    }
    markup = markup + "</ul>";
    // Inject the list markup into the content element.
    $content.html(markup);

    // Pages are lazily enhanced. We call page() on the page
    // element to make sure it is always enhanced before we
    // attempt to enhance the listview markup we just injected.
    $page.page();

    // Enhance the listview we just injected.
    $content.find( ":jqmData(role=listview)" ).listview();

    $.mobile.loading('hide');
    $("#homelink").click();


});

$("#delete").click(function(){
    var name=localStorage.getItem("del");
    var index=0;
    var myDvrs=localStorage.getItem("myDvrs");
    myDvrs=JSON.parse(myDvrs);
    for(var i=0; i<myDvrs.length; i++){

        if(myDvrs[i].Name==name)
        {
            index=i;
            continue;
        }
    }

   myDvrs.splice(index,1);
   localStorage.setItem("myDvrs",JSON.stringify(myDvrs));


    });



$( "#adddvrbtn" ).click(function() {
    var dvr = {};
    dvr.Name=$("#name").val();
    dvr.Url=$("#url").val();
    dvr.Port=$("#port").val();
    dvr.User = $("#user").val();
    dvr.Pass=$("#pass").val();

    var myDvrs = localStorage.getItem("myDvrs");
    myDvrs = JSON.parse(myDvrs);
    if(myDvrs == null)
        myDvrs = [];

    var index=0;
    for(var i=0; i<myDvrs.length; i++){

        if(myDvrs[i].Name==dvr.Name)
        {
            index=1;
        }

     }
    if(index==0){
        myDvrs.push(dvr);
        localStorage.setItem("myDvrs", JSON.stringify(myDvrs));

        $("#name").val("");
        $("#url").val("");
        $("#port").val("");
        $("#user").val("");
        $("#pass").val("");
    }
    else
    {
        alert("The dvr name exist");
        return false;
    }




});









