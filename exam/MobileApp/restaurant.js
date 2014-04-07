//-------Location------
    
//---Current----
var ava = document.getElementById('ava');
$('#ava').click(function(){
var location1 = $( "from" ).val();

$.getJSON("http://localhost:8983/solr/collection1_shard1_replica1/select?q=*&wt=json&json.wrf=?&indent=true", function(result){
    var i;
     var j;
    
    for (i=0;i<10000;i++)
    {
        for (j=0;j<20;j++)
        {
        if(result.response.docs[i].title[j] == location1)
        {
            var input1= result.response.docs[i].title[10];
            var input2= result.response.docs[1].title[11];
            document.getElementById('write').innerHTML = "Available Best Restaurant as per the government and Users Survey near by:";
            document.getElementById('write1').innerHTML = " Govt Survey Rating:  "+ result.response.docs[i].title[7];
             document.getElementById('write3').innerHTML = " User Survey Rating:  "+ result.response.docs[i].title[7]
             document.getElementById('write2').innerHTML = "Address:  "+ result.response.docs[i].title[13]+ " , "+result.response.docs[i].title[18]+" ,"+result.response.docs[i].title[2]+ " , " +result.response.docs[i].title[1]+"  ,  "+result.response.docs[i].title[0]+",ZIPCODE:"+result.response.docs[i].title[5];
           // $('p.info').html "{x}"/ +" " + result.response.docs[1].title +" "+ result.response.docs[0].id +" "+ result.response.docs[1].id);*/
        }    
        }
}
    
});
});

var mapProp={
    zoom:5,
    mapTypeId:'roadmap'
};

    
//var map1=new google.maps.Map($('#map1')[0], mapProp);
var map1=new google.maps.Map(
  document.getElementById("map1"),mapProp);
var markers = [];
//if(navigator.geolocation) {
   //navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(51.5072, 0.1275
                                      );

      var infowindow = new google.maps.InfoWindow({
        map: map1,
        position: pos,
        //content: 'Location found using HTML5.'
 });
    map1.setCenter(pos);
        
        
        var marker=new google.maps.Marker({
  position:pos,
  });

marker.setMap(map1);


  

//----------------------------------------------------------------------

var mapProp2={
    zoom:5,
    mapTypeId:'roadmap'
};


    
//var map1=new google.maps.Map($('#map1')[0], mapProp);
var map2=new google.maps.Map(
  document.getElementById("map2"),mapProp2);
var markers2 = [];
//if(navigator.geolocation) {
  // navigator.geolocation.getCurrentPosition(function(position) {
      var pos2 = new google.maps.LatLng(51.5129170,-0.089031
                                       );

      var infowindow2 = new google.maps.InfoWindow({
        map: map2,
        position: pos2,
        //content: 'Location found using HTML5.'
 });
    map2.setCenter(pos2);
 
        
        
        var marker2=new google.maps.Marker({
  position:pos2,
  });

marker2.setMap(map2);

    
//======================================================
//----direction----
var button = document.getElementById('button');
//var str = $( "#from" ).text();
//var b= $("#to").text();

var directionDisplay;
var directionsService = new google.maps.DirectionsService();     //Create a DirectionsService object which is required to communicate with the Google Maps API Direction Service
var map3;
$('#button').click(function(){
    
    directionsDisplay = new google.maps.DirectionsRenderer();        //Create a DirectionsRenderer object to render the directions results
    var center = new google.maps.LatLng(0, 0);    //Map is centered at 0,0
    var myOptions =
    {
            zoom:7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center
    }
    map3 = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map3);
    var start = $( "#from" ).val();     //Set the source/ origin
    var end = $( "#to" ).val();  //Set the destination
    var request =
    {
            origin:start,
        destination:end,
            travelMode: google.maps.DirectionsTravelMode.WALKING          //Current travel mode is DRIVING. You can change to BICYCLING or WALKING and see the changes.
    };
    directionsService.route(request, function(response, status)
    {
            if (status == google.maps.DirectionsStatus.OK) //Check if request is successful.
            {
            directionsDisplay.setDirections(response);         //Display the directions result
            }
    });
});

//------Weather--------------


var button1 = document.getElementById('button1');
//var str = $( "#from" ).text();
//var b= $("#to").text();

var directionDisplay2;
var directionsService2 = new google.maps.DirectionsService();     //Create a DirectionsService object which is required to communicate with the Google Maps API Direction Service
var map3;
$('#button1').click(function(){
    
    directionsDisplay2 = new google.maps.DirectionsRenderer();        //Create a DirectionsRenderer object to render the directions results
    var center2 = new google.maps.LatLng(0, 0);    //Map is centered at 0,0
    var myOptions2 =
    {
            zoom:7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center2
    }
    map3 = new google.maps.Map(document.getElementById("map_canvas1"), myOptions2);
    directionsDisplay2.setMap(map3);
    var start2 = $( "#from" ).val();     //Set the source/ origin
    var end2 = $( "#to1" ).val();  //Set the destination
    var request2 =
    {
            origin:start2,
        destination:end2,
            travelMode: google.maps.DirectionsTravelMode.WALKING          //Current travel mode is DRIVING. You can change to BICYCLING or WALKING and see the changes.
    };
    directionsService2.route(request2, function(response, status)
    {
            if (status == google.maps.DirectionsStatus.OK) //Check if request is successful.
            {
            directionsDisplay2.setDirections(response);         //Display the directions result
            }
    });
});

    







button.addEventListener('click', onClick, false);
ava.addEventListener('click', onClick, false);
ava1.addEventListener('click', onClick, false);

button1.addEventListener('click', onClick, false);
