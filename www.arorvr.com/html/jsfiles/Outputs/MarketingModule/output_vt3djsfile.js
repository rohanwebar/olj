
  let urlparamsi = new URLSearchParams(location.search);
  var virtualtourid = urlparamsi.get("virtualtourid");

exampleTarget=document.getElementById('modelPivotcard');
         
         // detect target found
        exampleTarget.addEventListener("targetFound", event => {
          console.log("target found");
          console.log(exampleTarget.getAttribute('scale'))
        });
        // detect target lost
        exampleTarget.addEventListener("targetLost", event => {
          console.log("target lost");
          console.log(exampleTarget.getAttribute('scale'))
        });
      

    thedata='none'
    var kk
    var menutype='none'
    var alreadyinitiated='no'

    
    function aftergetting3dtour(result){
        console.log(result)
        thedata=result
        
        thebase=document.getElementById('thesweperslides')

        if(result.obj){
          document.querySelector('a-scene').setAttribute('mindar-image', {
            imageTargetSrc: result.obj.themarkerfile,
            filterMinCF: 0.001,
            filterBeta: 100,
            missTolerance:15,
            autoStart: false,
            uiScanning: '#example-scanning-overlay',
          });
          document.getElementById('theimagetobescanned').src=result.obj.photos
          
            
            if(result.exterior3dmodels){
              for (var i = 0; i < Object.keys(result.exterior3dmodels).length; i++) {

                if(i==0){
                  alreadyinitiated="true"
                  changethemodalonar(thedata['exterior3dmodels'][i].virtualtourTitle,thedata['exterior3dmodels'][i]['virtualtourDescription'],thedata['exterior3dmodels'][i]['model'])
                }
                thelement= result.exterior3dmodels[Object.keys(result.exterior3dmodels)[i]]
                const swiperSlideDiv = document.createElement('div');
                swiperSlideDiv.classList.add('swiper-slide');
                swiperSlideDiv.classList.add("swiperexterior");
                swiperSlideDiv.classList.add('exterior');
                swiperSlideDiv.id="swiperslideid_exterior_" + i;
                const detailDiv = document.createElement('div');
                detailDiv.classList.add('detail');
                const h3Element = document.createElement('h3');
                h3Element.textContent = thelement.virtualtourTitle;//Title
                detailDiv.appendChild(h3Element);
                swiperSlideDiv.appendChild(detailDiv);
                thebase.appendChild(swiperSlideDiv)
              }
            }
            if(result.Units3dmodels){
                for (var i = 0; i < Object.keys(result.Units3dmodels).length; i++) {
                  if(alreadyinitiated!='true'){
                    changethemodalonar(thedata['Units3dmodels'][i].virtualtourTitle,thedata['Units3dmodels'][i]['virtualtourDescription'],thedata['Units3dmodels'][i]['model'])
                  }
                  thelement= result.Units3dmodels[Object.keys(result.Units3dmodels)[i]]
                  const swiperSlideDiv = document.createElement('div');
                  swiperSlideDiv.classList.add('swiper-slide');
                  swiperSlideDiv.classList.add('interior');
                  swiperSlideDiv.classList.add("swiperinterior");
                  swiperSlideDiv.id="swiperslideid_interior_" + i
                  const detailDiv = document.createElement('div');
                  detailDiv.classList.add('detail');
                  const h3Element = document.createElement('h3');
                  h3Element.textContent = thelement.virtualtourTitle;//Title
                  detailDiv.appendChild(h3Element);
                  swiperSlideDiv.appendChild(detailDiv);
                  thebase.appendChild(swiperSlideDiv)
                }
            }
        }
        return 'done'
      }

      function changethemodalonar(Title,Description,Modal){
      
        document.getElementById('thenameofvirtualtour').innerHTML=Title
        document.getElementById('thedescriptionofvirtualtour').innerHTML=Description
        theurl=theurlforstaticfilevalues+Modal
        document.querySelector('#modelPivotmodel').setAttribute('src',theurl)
        document.getElementById("thehidden").style.opacity = 0;
        document.getElementById("thehidden").style.display = "none";

      }



      function makeaddeventlisteners(){
        console.log('ok')
        $(".swiperinterior").on("click", function (e) {
          kk=$(this)
          theidoftheinterior=kk[0].id.split('_')[2]
          changethemodalonar(thedata['Units3dmodels'][theidoftheinterior]['virtualtourTitle'],thedata['Units3dmodels'][theidoftheinterior]['virtualtourDescription'],thedata['Units3dmodels'][theidoftheinterior]['model'])

        })
        $(".swiperexterior").on("click", function (e) {
          kk=$(this)
          theidoftheexterior=kk[0].id.split('_')[2]
          changethemodalonar(thedata['exterior3dmodels'][theidoftheexterior]['virtualtourTitle'],thedata['exterior3dmodels'][theidoftheexterior]['virtualtourDescription'],thedata['exterior3dmodels'][theidoftheexterior]['model'])
        }) 
        //$(".swiperinterior").on("click", function (e) {
        //  alert("swiperinterior");
        //})
        //$(".swiperexterior").on("click", function (e) {
        //  alert("swiperexterior");
        //})
        return "done"
      }

      
      
      
      
      
    let arSystem;
    document.querySelector('a-scene').addEventListener('loaded', function () {
      arSystem = document.querySelector('a-scene').systems["mindar-image-system"];
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };


      let theurlabouttofetch =
        "https://backendtech.arorvr.com/getthemm3d/"+virtualtourid
      fetch(theurlabouttofetch, requestOptions)
        .then((response) => response.json())
        .then((result) => aftergetting3dtour(result))
        .then((result) => makeaddeventlisteners())
        .then((result) => arSystem.start())
        .catch((error) => console.log("error", error));
    });
      
      
      
      
      
      
    

        const swiper = new Swiper('.swiper', {
          // Optional parameters
          direction: 'vertical',
          loop: true,
        
          // If we need pagination
          pagination: {
            el: '.swiper-pagination',
          },
        
          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        
          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar',
          },
        });

        function opentheexteriorslides() {
          
          if (document.getElementById("thehidden").style.display == "none") {
            
            // Make all elements with class "swiper-slide" visible
            const swiperSlideElements = document.querySelectorAll('.swiper-slide');
            swiperSlideElements.forEach(element => {
              element.style.display = 'none';
            });

            // Now, perform the action on elements containing "exterior" in their class list
            const exteriorElements = document.querySelectorAll('[class*="exterior"]');
            exteriorElements.forEach(element => {
              // Your action for "exterior" elements goes here
              // For example, you can set their visibility to 'hidden':
              element.style.display = 'block';
            });
            document.getElementById("thehidden").style.display = "block";

    
            var swiper = new Swiper(".swiper-container", {
              effect: "coverflow",
              grabCursor: true,
              centeredSlides: true,
              slidesPerView: "auto",
              coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 350,
                modifier: 1,
                slideShadows: true,
              },
              pagination: {
                el: ".swiper-pagination",
              },
            });
            menutype='exterior'
    
            document.getElementById("thehidden").style.opacity = 1;
          } else {
            console.log(menutype)
            if(menutype=='interior'){
              document.getElementById("thehidden").style.opacity = 0;
              document.getElementById("thehidden").style.display = "none";
              opentheexteriorslides()
            }
            else{
              menutype='none'
              document.getElementById("thehidden").style.opacity = 0;
              document.getElementById("thehidden").style.display = "none";
            }
          
          }
        }

        function opentheinteriorslides() {

          
          
          if (document.getElementById("thehidden").style.display == "none") {
            // Make all elements with class "swiper-slide" visible
              const swiperSlideElements = document.querySelectorAll('.swiper-slide');
              swiperSlideElements.forEach(element => {
                element.style.display = 'none';
              });

              // Now, perform the action on elements containing "exterior" in their class list
              const exteriorElements = document.querySelectorAll('[class*="interior"]');
              exteriorElements.forEach(element => {
                // Your action for "exterior" elements goes here
                // For example, you can set their visibility to 'hidden':
                element.style.display = 'block';
              });
              document.getElementById("thehidden").style.display = "block";
    
            var swiper = new Swiper(".swiper-container", {
              effect: "coverflow",
              grabCursor: true,
              centeredSlides: true,
              slidesPerView: "auto",
              coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 350,
                modifier: 1,
                slideShadows: true,
              },
              pagination: {
                el: ".swiper-pagination",
              },
            });
            menutype='interior'
            
    
            document.getElementById("thehidden").style.opacity = 1;
          } else {

            console.log(menutype)
            if(menutype=='exterior'){
              
              document.getElementById("thehidden").style.opacity = 0;
              document.getElementById("thehidden").style.display = "none";
              opentheinteriorslides()
            }
            else{
              menutype='none'
              document.getElementById("thehidden").style.opacity = 0;
              document.getElementById("thehidden").style.display = "none";
            }
          }
        }


        function opentheallslides() {
          
          if (document.getElementById("thehidden").style.display == "none") {
            
            // Make all elements with class "swiper-slide" visible
            const swiperSlideElements = document.querySelectorAll('.swiper-slide');
            swiperSlideElements.forEach(element => {
              element.style.display = 'block';
            });

            document.getElementById("thehidden").style.display = "block";

    
            var swiper = new Swiper(".swiper-container", {
              effect: "coverflow",
              grabCursor: true,
              centeredSlides: true,
              slidesPerView: 3,
              keyboardControl: true,
              mousewheelControl: true,
              coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 350,
                modifier: 1,
                slideShadows: true,
              },
              pagination: {
                el: ".swiper-pagination",
              },
            });
            menutype='exterior'
    
            document.getElementById("thehidden").style.opacity = 1;
          } else {
            console.log(menutype)
           
          
          }
        }

        

        function opentheproject()
        {
          var goingURL ="https://www.arorvr.com/VirtualTour/VirtualTour3D/tour.html?code1="+thedata['customercode']+"&virtual3Dtourid="+thedata['obj']['Marketingmodulevirtualtour3Dimages']
          window.open(goingURL, "_blank");
        }




      
      

        
