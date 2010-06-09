var conferenceMap = function(args){
  this.canvasId = args.canvasId;
  this.listId = args.listId;
  this.dataURL = args.dataURL;
  
  if(this.canvasId != undefined && 
     this.listId != undefined && 
     this.dataURL != undefined){
       
    this.initialize();          
  }
  
  return this;
};
conferenceMap.prototype.initialize = function(){
  this.loadGoogleMaps();
  if(this.map != undefined){
    this.loadConfData();
  }  
};
conferenceMap.prototype.loadGoogleMaps = function(){
  if(GBrowserIsCompatible()){
    this.map = new GMap2(document.getElementById(this.canvasId));

    // Center on USA by Default
    var lat = 37.0625;
    var lng = -95.677068;
    var zoom_level = 3;
    
    this.map.setCenter(new GLatLng(lat,lng), zoom_level);
    this.map.setUIToDefault();
    this.map.disableScrollWheelZoom();    
  }
};
conferenceMap.prototype.loadConfData = function(){
  $.ajax({
    url: this.dataURL,
    dataType: 'json',
    success: this.populateList(this)
  });  
};
conferenceMap.prototype.formatDate = function(_date){
  return _date.start + " - " + _date.end;
};
conferenceMap.prototype.formatWebsite = function(_website){
  return "<a href='"+_website+"'>"+_website+"</a>";
};
conferenceMap.prototype.populateList = function(self){
  return function(conferences){
    if(typeof conferences == "object" && conferences.length > 0){
      var list = $("<ul>");
      self.conferences = {};
      
      $.each(conferences, function(idx, conference){
        var html = ["<li>"];
        html.push("<span class='name'>"+conference.name+"</span>");
        html.push("<span class='time'>"+self.formatDate(conference.date)+"</span>");
        html.push("</li>");
        list.append(html.join("\n"));

        var marker = self.addConfToMap(conference);
        GEvent.addListener(marker, "click", function(latLng){
          var html = [];
          html.push("<p class='conferenceDetails'>");
          html.push("<span class='name'>"+conference.name+"</span>");
          html.push("<span class='time'>"+self.formatDate(conference.date)+"</span>");          
          html.push("<span class='address'>"+conference.address+"</span>");          
          html.push("<span class='website'>"+self.formatWebsite(conference.website)+"</span>");          
          html.push("</p>");
          marker.openInfoWindow(html.join("\n"));
        });

        self.conferences[conference.name] = marker;
      });
      $("#" + self.listId).append(list);
      $(".name").click(function(){
        var conferenceName = $(this).text();
        GEvent.trigger(self.conferences[conferenceName], "click");
      });
    }
  };
};
conferenceMap.prototype.addConfToMap = function(conference){
  var latLng = new GLatLng(conference.geo.lat, conference.geo.lng);
  var marker = new GMarker(latLng);
    
  this.map.addOverlay(marker);  
  return marker;
};