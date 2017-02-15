     
     function addClient(){
     $('#addClientButton').click(function(){
         
         var clientName = $('#clinedaddval').val();
         var selectedPlan = $("#plans option:selected").val();
          
         var data = {client: clientName,plan: selectedPlan,method:"addClient"};
            
                     $.post("/api/api.php", data, function(data){
                             $('.userresponse').fadeIn(function () {
                        $(this).html(data.message);
                        });
                         setTimeout(function () {
                             $('.userresponse').fadeOut(function () {
                                 $(this).hide();
                             });
                         }, 2000)
                         $('#clinedaddval').val("");
                     })
                     
                    
     });
      
     }
 function addUser() {
         $("#addUser").click(function(){
             var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
             var username = $("#username").val();
             var password = $("#password").val();
             if(!regex.test(password)){
                 $('.userresponse').fadeIn(function () {
                     $(this).html('<span>Password must containt at least 1 Capital letter and 1 number</span>');
                 });
                 setTimeout(function () {
                     $('.userresponse').fadeOut(function () {
                         $(this).hide();
                     });
                 }, 2000)
             }else {
                 var md5Password = CryptoJS.MD5(password);
                 var hashPassword = md5Password.toString();
                 var data = {username: username, password: hashPassword, method: "add_user"};
                 $.post("/api/api.php", data, function (data) {
                     if (data.response == "Success") {
                         $('.userresponse').empty();
                         $('#username').val('');
                         $('#password').val('');

                         $('.userresponse').fadeIn(function () {
                             $(this).html('<span>User added</span>');
                         });
                         setTimeout(function () {
                             $('.userresponse').fadeOut(function () {
                                 $(this).hide();
                             });
                         }, 2000)
                     } else if (data.response == "Error" && data.message == "User already exist") {
                         $('.userresponse').empty();
                         $('.userresponse').fadeIn(function () {
                             $(this).html('<span>User alredy exist</span>');
                         });
                         setTimeout(function () {
                             $('.userresponse').fadeOut(function () {
                                 $(this).hide();
                             });
                         }, 2000)
                     }
                 });
             }
         })

     }
function retrieveClients(){
        var data = {method:"retrieveClients"};
         $.post("/api/api.php", data).done(function (response) {
                if(response.response == "Success"){
                    var clients = response.clients;
                    var clientsdiv = "";
                    $.each(clients,function(key,value){
                        clientsdiv+="<div class='clientrow'><div class='client_id' style='display:none'>"+value.clientId+"</div><div class='name'>"+value.username+"</div><div class='registered'>Expire date: <span>"+value.expire+"</span></div><button class='editClients'>Edit Client</button><button class='deleteClients'>Delete Client</button></div>";
                    });
                    setTimeout(function(){
                         editClient();
                        deleteClient();
                    },400);
                   
                    $("#allclients").html(clientsdiv).show();
                }else{
                    console.log();
                }
//                
            });
    
}
function editClient(){
    $(".editClients").click(function(){
        $('.popup').show();
       var client_id = $(this).siblings('.client_id').text();
        var client_name = $(this).siblings('.name').text();
        var client_expire = $(this).siblings('.registered').find('span').text();
        console.log(client_name, client_expire, client_id);
        $('.popup').load('editclient.php', function(){
            $('#username').val(client_name);
            $('#expiredate').val(client_expire);
            $('.editUserafter').attr('id', client_id);
            editafteruser();
        });
    });
}
function deleteClient(){
    $(".deleteClients").click(function(){
        var client_id = $(this).siblings('.client_id').text();
        var data = {client_id: client_id, method:'delete_client'};
        $.post("/api/api.php", data, function(data){
            if(data.response == "Success"){
                location.reload();
            }
        });
    });
}

function editafteruser(){
    $('.editUserafter').click(function(){
        var edited_name = $('#username').val();
        var edited_date = $('#expiredate').val();
        var c_id = $('.editUserafter').attr('id');
        var data = {client_id: c_id, client_name: edited_name, client_expire:edited_date, method:'edit_client'};
        $.post("/api/api.php", data, function(data){
            if(data.response == "Success"){
                location.reload();
            }
        });
    })
}

     function compute_results(form){

         if (!check_form(form)) {
             return false;
         }

         if (form.vlight.value.length == 0){
             form.vlight.value = "0";
         }

         if (form.light.value.length == 0){
             form.light.value = "0";
         }

         if (form.moderate.value.length == 0){
             form.moderate.value = "0";
         }

         if (form.heavy.value.length == 0){
             form.heavy.value = "0";
         }

         if (form.vheavy.value.length == 0){
             form.vheavy.value = "0";
         }

         var us = document.getElementById("mesurement_sys_us");
         if (us.checked) {
             var weight = form.weight.value * 0.45359237;
             var height = form.height_feet.value * 30.48 + form.height_inches.value * 2.54 ;
         } else {
             var weight = form.weight.value;
             var height = form.height_cm.value;
         }


         var BasalEnergyExpenditureMale = Math.round(66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * form.age.value));
         var BasalEnergyExpenditureFemale = Math.round(655 + (weight * 9.563) + (1.85 * height) - (4.676 * form.age.value));


         var very_light_male = Math.round((BasalEnergyExpenditureMale * 1.4 / 1440) * form.vlight.value);
         var light_male = Math.round((BasalEnergyExpenditureMale * 2.5 / 1440) * form.light.value);
         var moderate_male = Math.round((BasalEnergyExpenditureMale * 4.2 / 1440) * form.moderate.value);
         var heavy_male = Math.round((BasalEnergyExpenditureMale * 8.2 / 1440) * form.heavy.value);
         var very_heavy_male = Math.round((BasalEnergyExpenditureMale * 12 / 1440) * form.vheavy.value);

         var very_light_female = Math.round((BasalEnergyExpenditureFemale * 1.4 / 1440) * form.vlight.value);
         var light_female = Math.round((BasalEnergyExpenditureFemale * 2.5 / 1440) * form.light.value);
         var moderate_female = Math.round((BasalEnergyExpenditureFemale * 2.5 / 1440) * form.moderate.value);
         var heavy_female = Math.round((BasalEnergyExpenditureFemale * 2.5 / 1440) * form.heavy.value);
         var very_heavy_female = Math.round((BasalEnergyExpenditureFemale * 2.5 / 1440) * form.vheavy.value);

         var wake_male = Math.round(((BasalEnergyExpenditureMale * 1.4) / 1440 * form.vlight.value) + ((BasalEnergyExpenditureMale * 2.5) / 1440 * form.light.value) + ((BasalEnergyExpenditureMale * 4.2) / 1440 * form.moderate.value) + ((BasalEnergyExpenditureMale * 8.2) / 1440 * form.heavy.value) + ((BasalEnergyExpenditureMale * 12) / 1440 * form.vheavy.value));
         var wake_female = Math.round(((BasalEnergyExpenditureFemale * 1.4) / 1440 * form.vlight.value) + ((BasalEnergyExpenditureFemale * 2.5) / 1440 * form.light.value) + ((BasalEnergyExpenditureFemale * 2.5) / 1440 * form.moderate.value) + ((BasalEnergyExpenditureFemale * 2.5) / 1440 * form.heavy.value) + ((BasalEnergyExpenditureFemale * 2.5) / 1440 * form.vheavy.value));

         var sleep_male = Math.round(1440 - form.vlight.value - form.light.value - form.moderate.value - form.heavy.value - form.vheavy.value);
         sleep_male = Math.round((BasalEnergyExpenditureMale / 1440) * sleep_male);

         var sleep_female = Math.round(1440 - form.vlight.value - form.light.value - form.moderate.value - form.heavy.value - form.vheavy.value);
         sleep_female = Math.round((BasalEnergyExpenditureFemale / 1440) * sleep_female);


         var rez_male = document.getElementById("burn_male");
         var rez_female = document.getElementById("burn_female");

         rez_male.innerHTML = Math.round((sleep_male * 1) + (wake_male * 1));
         rez_female.innerHTML = Math.round((sleep_female * 1) + (wake_female * 1));


         return;

     }

     function clear_results(form){
         form.age.value = "0";
         form.weight.value = "0";
         form.height_feet.value = "0";
         form.height_feet.value = "0";
         form.height_cm.value = "0";

         form.sleep.value = "0";
         form.vlight.value = "0";
         form.light.value = "0";
         form.moderate.value = "0";
         form.heavy.value = "0";
         form.vheavy.value = "0";

         var rez_male = document.getElementById("burn_male");
         var rez_female = document.getElementById("burn_female");

         rez_male.innerHTML = "";
         rez_female.innerHTML = "";

         var minutes_left = document.getElementById("minutes_left");
         minutes_left.innerHTML = "1440"

         switch_to_us();

         return;

     }

     function switch_to_us() {
         var us = document.getElementById("height_us");
         var metric = document.getElementById("height_metric");

         us.style.display = 'block';
         metric.style.display = 'none';

         var weight_us = document.getElementById("weight_us");
         var weight_metric = document.getElementById("weight_metric");

         weight_us.style.display = 'inline';
         weight_metric.style.display = 'none';

         var height_centimeters = document.getElementById("height_centimeters");
         height_centimeters.style.display = 'none';

         var us = document.getElementById("mesurement_sys_us");
         var metric = document.getElementById("mesurement_sys_metric");
         us.checked = true;
         metric.checked = false;

         form.weight.value = "0";
         form.height_feet.value = "0";
         form.height_feet.value = "0";
         form.height_cm.value = "0";

         return true;
     }


     function switch_to_metric() {
         var us = document.getElementById("height_us");
         var metric = document.getElementById("height_metric");

         us.style.display = 'none';
         metric.style.display = 'block';

         var weight_us = document.getElementById("weight_us");
         var weight_metric = document.getElementById("weight_metric");

         weight_us.style.display = 'none';
         weight_metric.style.display = 'inline';

         var height_centimeters = document.getElementById("height_centimeters");
         height_centimeters.style.display = 'inline';

         var us = document.getElementById("mesurement_sys_us");
         var metric = document.getElementById("mesurement_sys_metric");
         us.checked = false;
         metric.checked = true;

         form.weight.value = "0";
         form.height_feet.value = "0";
         form.height_feet.value = "0";
         form.height_cm.value = "0";

         return true;
     }

     function recalc_minutes_left(field) {
         var form = field.form;

         if (check_value(field)) {
             var minutes_left = document.getElementById("minutes_left");
             var sleep = form.sleep.value;
             var vlight = form.vlight.value;
             var light = form.light.value;
             var moderate = form.moderate.value;
             var heavy = form.heavy.value;
             var vheavy = form.vheavy.value;

             var left = 1440 - sleep - vlight - light - moderate - heavy - vheavy;
             minutes_left.innerHTML = left;

             if (left == 0) {
                 minutes_left.className = '';
             } else {
                 minutes_left.className = 'calorie_calculator_minutes_left_error';
             }

             var ret = true;
         } else {
             var ret = false;
         }

         return ret;
     }


     function clear_results_calorie_form(form) {
         clear_results(form);
     }


     function check_value(field) {
         var ret = true;
         if ((parseInt(field.value)).toString() == field.value.toString()) { // checking for integer
             if (field.value < 0) {
                 alert('You have to enter positive value (i.e. greater than zero)');
                 field.value = "0";
                 ret = false;
             }
         } else {
             alert('You have to enter integer number value.');
             field.value = "0";
             ret = false;
         }

         return ret;
     }


     function check_form(form) {
         var ret = false;

         var us = document.getElementById("mesurement_sys_us");
         if (us.checked) {
             var weight = form.weight.value;
             var height = form.height_feet.value;
         } else {
             var weight = form.weight.value;
             var height = form.height_cm.value;
         }

         if (form.age.value > 0) {
             if (height > 0) {
                 if (weight > 0 ) {
                     if (form.sleep.value > 0) {
                         var minutes_left = parseInt(document.getElementById("minutes_left").innerHTML);

                         if (minutes_left > 0) {

                             alert('Sum of the minutes for activities per day does not equal 1440 minutes (24h). You still have to distribute ' + minutes_left + ' minutes. "Minutes left to distribute" must become zero.');
                         } else {
                             if (minutes_left < 0) {
                                 alert('Sum of the minutes for activities per day is greater than 1440 minutes (24h). Please correct the distribution. "Minutes left to distribute" must become zero.');
                             } else {
                                 ret = true;
                             }
                         }
                     } else {
                         alert('You did not entered value for sleeping (greater than zero).');
                     }
                 } else {
                     alert('Enter your weight.');
                 }
             } else {
                 alert('Enter your height.');
             }
         } else {
             alert('Enter your age.');
         }

         return ret;
     }