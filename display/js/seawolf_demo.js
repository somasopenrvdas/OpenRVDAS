/*
  NOTE: Native OpenRVDAS widgets are now deprecated, will switch over to Grafana-based displays hopefully
  A WidgetServer is created from a list of widgets that each subscribe to a
  field from dictionaries provided to the CachedDataServer from seawolf.yaml
  and seawolf_devices.yaml.
  How to push a text widget to the widget list:
  'htmlid' indicates the id of the span or div in the demo html where you want display read values.
  key indicates an actual key in the dictionaries provided to the CachedDataServer.
  transform: allows you to "transform" the value that you get from the key in the form of a function.
  returns the processed value to be displayed in the widget on the page.
  widget_list.push(new TextWidget('htmlid',
                               { key: {name: 'descriptive name', transform: function(val) {
                                    return val
                                  }
                               }}));
*/
var list = new Array
var WEBSOCKET_DATA_SERVER = 'ws://localhost:8766'
var widget_list = []
var widget_width = 400
var widget_height = 200

////////////////////////////////////////////////////////////////////////////////
//Wind widgets.


widget_list.push(new DialWidget('true_wind_dial',
                                  {
                                    Met1WindDirTrue: {
                                    name: 'True Wind',
                                    color: 'red',
                                  }},
                                  {title:{text:''},
                                   chart:{type: 'gauge',
                                          backgroundColor:'white',
                                          maxPadding:0,
                                          marginTop:0,
                                          marginBottom:0,
                                          marginLeft:0,
                                          marginRight:0,
                                          height: widget_height,
                                          width: widget_height,
                                         },
                                   maxPadding: 0.05}));


//why do true wind direction and wind speed need custom timeouts?
widget_list.push(new TextWidget('true_wind_dir',
                                 {
                                   Met1WindDirTrue: {
                                        name: 'Wind Dir True',
                                        timeout_css: {
                                          5: "background-color:yellow",
                                         15: "background-color:red"
                                        }}}));

widget_list.push(new TextWidget('rel_wind_dir',
                                 {
                                   Met1WindDirMag: {
                                        name: 'Relative Wind',
                                        timeout_css: {
                                          5: "background-color:yellow",
                                         15: "background-color:red"
                                        }}}));

widget_list.push(new DialWidget('rel_wind_dial',
                                  {
                                    Met1WindDirMag: {
                                    name: 'Relative Wind',
                                    color: 'red',
                                  }},
                                  {title:{text:''},
                                   chart:{type: 'gauge',
                                          backgroundColor:'white',
                                          maxPadding:0,
                                          marginTop:0,
                                          marginBottom:0,
                                          marginLeft:0,
                                          marginRight:0,
                                          height: widget_height,
                                          width: widget_height,
                                         },
                                   maxPadding: 0.05}));

widget_list.push(new TextWidget('wind_speed_kt',
                                 {
                                   Met1WindSpeedKt: {
                                        name: 'True Wind Speed, kt',
                                        timeout_css: {
                                          5: "background-color:yellow",
                                         15: "background-color:red"
                                        }}}));

widget_list.push(new TimelineWidget('wind_speed_line',
                                    {
                                      Met1WindSpeedKt: {
                                        name: 'True Wind Speed, kt',
                                        seconds: 3600,
                                        color: 'red'
                                      }},
                                    'Knots',
                                    {title:{text:'Wind Speed'},
                                    chart: {type: 'line', height: widget_height, width: widget_width}},
                                    {title:{text:''}}
                                 ));

widget_list.push(new TextWidget('rel_wind_speed',
                                 {
                                   Met1WindSpeedM: {
                                        name: 'Relative Wind Speed, kt',
                                        timeout_css: {
                                          5: "background-color:yellow",
                                         15: "background-color:red"
                                        }}}));

widget_list.push(new TimelineWidget('rel_speed_graph',
                                    {
                                      Met1WindSpeedM: {
                                        name: 'Relative Wind Speed, kt',
                                        seconds: 3600,
                                        color: 'red'
                                      }},
                                    'Knots',
                                    {title:{text:'Relative Wind Speed'},
                                    chart: {type: 'line', height: widget_height, width: widget_width}},
                                    {title:{text:''}}
                                 ));

////////////////////////////////////////////////////////////////////////////////
//GPS text widgets.


widget_list.push(new TextWidget('gps_lat',
                                {
                                  Met1Latitude: {
                                    name: "Latitude",
                                    transform: function(val) {
                                      return (Math.round(val*100)/10000).toFixed(3);
                                    }
                                  }}));

widget_list.push(new TextWidget('gps_lon',
                                {
                                  Met1Longitude: {
                                    name: "Longitude",
                                    transform: function(val) {
                                      return (Math.round(val*100)/10000).toFixed(3);
                                    }
                                  }}));

widget_list.push(new TextWidget('gps_n_or_s',
                                  {
                                    Met1NorS: {
                                      name: "N/S"
                                    }}));

widget_list.push(new TextWidget('gps_e_or_w',
                                {
                                  Met1EorW: {
                                    name: "E/W"
                                  }}));

widget_list.push(new TextWidget('course_true',
                                {
                                  Met1CourseTrue: {
                                    name: 'Course True'
                                  }}));

widget_list.push(new TextWidget('heading_true',
                                {
                                  Met1HeadingDeg: {
                                    name: 'Heading (True)'
                                  }})); //S330HeadingTrue

widget_list.push(new TextWidget('gps_sog',
                                {
                                  Met1SpeedKT: {
                                    name: 'Speed over Ground'
                                  }})); //S330SpeedKt

widget_list.push(new TextWidget('pitch',
                                {
                                  Met1Pitch: {
                                    name: 'Pitch'
                                  }}));

widget_list.push(new TextWidget('roll',
                                {
                                  Met1Roll: {
                                    name: 'Roll'
                                  }}));

////////////////////////////////////////////////////////////////////////////////
//Air and water temperature widgets.

widget_list.push(new TextWidget('air_temp',
                                {
                                  Met1AirTempC: {
                                    name: 'Air Temp'
                                  }}));

widget_list.push(new TimelineWidget('air_temp_graph',
                                     {
                                       Met1AirTempC: {
                                         name: 'Air Temperature',
                                         seconds: 3600,
                                         color: 'blue'
                                      }},
                                    'Celsius',
                                    {title:{text:'Air Temperature'},
                                    chart: {type: 'line', height: widget_height, width: widget_width}}
                                    ));

widget_list.push(new TextWidget('water_temp',
                                {
                                  DGHTempC1: {
                                    name: 'Water Temp'
                                  }}));

widget_list.push(new TimelineWidget('water_temp_graph',
                                     {
                                       DGHTempC1: {
                                         name: 'Sea Surface Temperature',
                                         seconds: 3600,
                                         color: 'darkblue'
                                      }},
                                    'atm',
                                    {title:{text:'Sea Surface Temperature'},
                                    chart: {type: 'line', height: widget_height, width: widget_width}}
                                    ));

////////////////////////////////////////////////////////////////////////////////
//Barometric pressure widgets.

widget_list.push(new TextWidget('baro_pres_in',
                                {
                                  Met1BaroPressureInches: {
                                    name: 'Barometric Pressure Inches'
                                  }}));

widget_list.push(new TimelineWidget('baro_pres_in_graph',
                                {
                                  Met1BaroPressureInches: {
                                    name: 'Barometric Pressure Inches',
                                    seconds: 3600,
                                    color: 'grey'
                                  }},
                                  'Inches',
                                  {title:{text:'Barometric Pressure Inches'},
                                  chart: {type: 'line', height: widget_height, width: widget_width}}
                                  ));


widget_list.push(new TextWidget('baro_pres_bar',
                                {
                                  Met1BarpPressureBar: {
                                    name: 'Barometric Pressure Bar'
                                  }}));

widget_list.push(new TimelineWidget('baro_pres_bar_graph',
                                     {
                                       Met1BarpPressureBar: {
                                         name: 'Barometric Pressure Bar',
                                         seconds: 3600,
                                         color: 'grey'
                                      }},
                                    'atm',
                                    {title:{text:'Barometric Pressure'},
                                    chart: {type: 'line', height: widget_height, width: widget_width}}
                                    ));

////////////////////////////////////////////////////////////////////////////////
//Magnetic variation widgets.

widget_list.push(new TextWidget('mag_var',
                                {
                                  Met1MagneticVar: {
                                    name: 'Magnetic Variation'
                                  }}));

widget_list.push(new TextWidget('mag_var_EorW',
                                {
                                  Met1MagneticVarEorW: {
                                    name: 'Magnetic Variation E or W'
                                  }}));

////////////////////////////////////////////////////////////////////////////////
//Time widgets and a date code block.


let today = new Date().toLocaleDateString()
document.getElementById("date").innerHTML = today


/*
widget_list.push(new TextWidget('time',
                                 {
                                   Met1Time: {
                                     name: "time",
                                     transform: function(val) {
                                       let sec = Math.floor(val % 100).toLocaleString('en-US',
                                                                                      {
                                                                                        minimumIntegerDigits: 2,
                                                                                        useGrouping: false
                                                                                      });
                                       val = val / 100;
                                       let min = Math.floor(val % 100).toLocaleString('en-US',
                                                                                      {
                                                                                        minimumIntegerDigits: 2,
                                                                                        useGrouping: false
                                                                                      });
                                       val = val / 100;
                                       let hour = Math.floor(val %100) -4;
                                       return hour + ":" + min + ":" + sec;
                                      }
                                    }}));
*/

widget_list.push(new TextWidget('time_utc',
                                 {
                                   Met1Time: {
                                     name: "time_utc",
                                     transform: function(val) {
                                       let sec = Math.floor(val % 100).toLocaleString('en-US',
                                                                                      {
                                                                                        minimumIntegerDigits: 2,
                                                                                        useGrouping: false
                                                                                      });
                                       val = val / 100;
                                       let min = Math.floor(val % 100).toLocaleString('en-US',
                                                                                      {
                                                                                        minimumIntegerDigits: 2,
                                                                                        useGrouping: false
                                                                                      });
                                       val = val / 100;
                                       let hour = Math.floor(val %100);
                                       return hour + ":" + min + ":" + sec;
                                    }
                                    }}));

////////////////////////////////////////////////////////////////////////////////
//ODO widgets.

widget_list.push(new TextWidget('do',
                                 {
                                   voltage1: {
                                     name: 'do',
                                     transform: function (val) {
                                      //val is taken from using the key voltage1 on the dict provided to the CachedDataServer.
                                      val = parseFloat(val)
                                      val /= 1000;
                                      let do_val = (4.1667 * val) - 0.4167
                                      return do_val.toFixed(3)
                                    }
                                   }}));


widget_list.push(new TimelineWidget('do_graph',
                                     {
                                       voltage1: {
                                         name: 'Dissolved Oxygen',
                                         transform: function (val) {
                                          //val is taken from using the key voltage1 on the dict provided to the CachedDataServer.
                                          val = parseFloat(val)
                                          val /= 1000;
                                          let do_val = (4.1667 * val) - 0.4167
                                          return do_val.toFixed(3)
                                        },
                                         seconds: 3600,
                                         color: 'orange'
                                      }},
                                    'mg/L',
                                    {title:{text:'Dissolved Oxygen'},
                                    chart: {type: 'line', height: widget_height, width: widget_width}}
                                    ));

widget_list.push(new TextWidget('do_saturation',
                                 {
                                   voltage2: {
                                     name: 'DO SATURATION',
                                     transform: function (val) {
                                      //val is taken from using the key voltage2 on the dict provided to the CachedDataServer.
                                      val = parseFloat(val)
                                      val /= 1000;
                                      let do_sat = ((0.4167 * val ) - 0.0417 ) * 100
                                      return do_sat.toFixed(3);
                                    }
                                   }}));


widget_list.push(new TimelineWidget('do_sat_graph',
                                     {
                                       voltage2: {
                                         name: 'Dissolved Oxygen Saturation',
                                         transform: function (val) {
                                            //val is taken from using the key voltage2 on the dict provided to the CachedDataServer.
                                            val = parseFloat(val)
                                            val /= 1000;
                                            let do_sat = ((0.4167 * val ) - 0.0417 ) * 100
                                            return do_sat.toFixed(3);
                                          },
                                         seconds: 3600,
                                         color: 'orange'
                                      }},
                                    'Percentage',
                                    {title:{text:'Dissolved Oxygen Saturation'},
                                    chart: {type: 'line', height: widget_height, width: widget_width}}
                                    ));

////////////////////////////////////////////////////////////////////////////////
//Fluorometer widget.
widget_list.push(new TextWidget('fluoro',
                                {
                                  fluoro: {
                                    name: 'fluorometer',
                                    transform: function (val) {
                                      let replaced = val.replace(/\s+/g,' ').trim();
                                      const splitArr = replaced.split(" ");
                                      return "Chlorophyll: " + splitArr[3] + " ug/l" + "<br>" + "Turbidity: " + splitArr[4] + " NTU" + "<br>" + "CDOM: " + splitArr[5] + " ppb";
                                    }
                                   }}));

////////////////////////////////////////////////////////////////////////////////
//Salinity widget.
widget_list.push(new TextWidget('salinity',
                                 {
                                   salinity: {
                                     name: 'Salinity'
                                 }}));

widget_list.push(new TextWidget('tsg_temp',
                                 {
                                   TSGTemp: {
                                     name: 'Thermosalinograph temperature'
                                 }}));

widget_list.push(new TimelineWidget('sal_graph',
                                     {
                                       salinity: {
                                         name: 'Salinity',
                                         seconds: 3600,
                                         color: 'black'
                                      }},
                                    'psu',
                                    {title:{text:'Salinity'},
                                    chart: {type: 'line', height: widget_height, width: widget_width}}
                                    ));

var widget_server = new WidgetServer(widget_list, WEBSOCKET_DATA_SERVER);

widget_server.serve();