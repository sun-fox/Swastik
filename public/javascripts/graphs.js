let myChart = document.getElementById('myChart').getContext('2d');
          
          // Global Options
          Chart.defaults.global.defaultFontFamily = 'Lato';
          Chart.defaults.global.defaultFontSize = 18;
          Chart.defaults.global.defaultFontColor = '#777';
      
          let massPopChart = new Chart(myChart, {
            type:'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
            data:{
              labels:['Polio', 'Jaundice', 'Hepatitis', 'Rickets', 'Cholera','Dengue'],
              datasets:[{
                label:'Count of Children',
                data:[
                  "<%=gdata.polio%>",
                  "<%=gdata.Jaundice%>",
                  "<%=gdata.hepatitis%>",
                  "<%=gdata.Rickets%>",
                  "<%=gdata.Chloera%>",
                  "<%=gdata.dengue%>"
                ],
                //backgroundColor:'green',
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ],
                borderWidth:1,
                borderColor:'#777',
                hoverBorderWidth:3,
                hoverBorderColor:'#000'
              }]
            },
            options:{
              title:{
                display:true,
                text:'Count Of Children With corresponding  Vaccines ',
                fontSize:25
              },
              legend:{
                display:true,
                position:'right',
                labels:{
                  fontColor:'#000'
                }
              },
              layout:{
                padding:{
                  left:50,
                  right:0,
                  bottom:0,
                  top:0
                }
              },
              tooltips:{
                enabled:true
              }
            }
          });




          let myChart2 = document.getElementById('myChart2').getContext('2d');
          
          // Global Options
          Chart.defaults.global.defaultFontFamily = 'Lato';
          Chart.defaults.global.defaultFontSize = 18;
          Chart.defaults.global.defaultFontColor = '#777';
      
          let massPopChart2 = new Chart(myChart2, {
            type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
            data:{
              labels:['Polio', 'Jaundice', 'Hepatitis', 'Rickets', 'Cholera','Dengue'],
              datasets:[{
                label:'Count of Children',
                data:[
                  "<%=gdata.polio%>",
                  "<%=gdata.Jaundice%>",
                  "<%=gdata.hepatitis%>",
                  "<%=gdata.Rickets%>",
                  "<%=gdata.Chloera%>",
                  "<%=gdata.dengue%>"
                ],
                //backgroundColor:'green',
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ],
                borderWidth:1,
                borderColor:'#777',
                hoverBorderWidth:3,
                hoverBorderColor:'#000'
              }]
            },
            options:{
              title:{
                display:true,
                text:'Count Of Children With corresponding  Vaccines ',
                fontSize:25
              },
              legend:{
                display:true,
                position:'right',
                labels:{
                  fontColor:'#000'
                }
              },
              layout:{
                padding:{
                  left:50,
                  right:0,
                  bottom:0,
                  top:0
                }
              },
              tooltips:{
                enabled:true
              }
            }
          });
          