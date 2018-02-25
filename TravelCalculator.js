// travelcalculator.js
// don't forget to validate at jslint.com

/*jslint devel: true, browser: true */
/*global $*/

$(function () {
    "use strict";

    //openweathermap api
    //Example of url: http://api.openweathermap.org/data/2.5/forecast?q=London&units=imperial&appid=bf9edcbc0e1c766071eb3d244fed61ba
    var api = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var apiKey = "&appid=b6907d289e10d714a6e88b30761fae22";
    var units = "&units=imperial";

    var input = $("#cityName");
    //getting weather
    function weatherAsk() {
        var url = api + input.val() + units + apiKey;
        //alert(url); //check if working
        $.getJSON(url, function (data) {

            //Getting High and Low Temperatures
            var high_temp1 = Math.ceil(data.list[0].main.temp_max);
            $("#day_1_high").html(high_temp1);
            var high_temp2 = Math.ceil(data.list[10].main.temp_max);
            $("#day_2_high").html(high_temp2);
            var high_temp3 = Math.ceil(data.list[10].main.temp_max);
            $("#day_3_high").html(high_temp3);
            var high_temp4 = Math.ceil(data.list[4].main.temp_max);
            $("#day_4_high").html(high_temp4);
            var high_temp5 = Math.ceil(data.list[5].main.temp_max);
            $("#day_5_high").html(high_temp5);
            var high_temp6 = Math.ceil(data.list[6].main.temp_max);
            $("#day_6_high").html(high_temp6);
            var high_temp7 = Math.ceil(data.list[7].main.temp_max);
            $("#day_7_high").html(high_temp7);
            //lows
            var low_temp1 = Math.ceil(data.list[0].main.temp_min);
            $("#day_1_low").html(low_temp1);
            var low_temp2 = Math.ceil(data.list[10].main.temp_min);
            $("#day_2_low").html(low_temp2);
            var low_temp3 = Math.ceil(data.list[10].main.temp_min);
            $("#day_3_low").html(low_temp3);
            var low_temp4 = Math.ceil(data.list[4].main.temp_min);
            $("#day_4_low").html(low_temp4);
            var low_temp5 = Math.ceil(data.list[5].main.temp_min);
            $("#day_5_low").html(low_temp5);
            var low_temp6 = Math.ceil(data.list[6].main.temp_min);
            $("#day_6_low").html(low_temp6);
            var low_temp7 = Math.ceil(data.list[7].main.temp_min);
            $("#day_7_low").html(low_temp7);


            /*
            //FIND ONE THEN DO +1 for the next day!
            //Getting Day of the Week
            var DoW2 = new Date(convertJSONTime(data.list[10].sys.dt_txt));
            //'February 18, 2018 09:15:30'
            //convertJSONTime(data.list[10].sys.dt_txt)
            var dayOfWeek2 = DoW2.getDay();
            switch (new Date().getDay()) {
                case 0:
                      dayOfWeek2 = "Sunday";
                      break;
                case 1:
                      dayOfWeek2 = "Monday";
                      break;
                case 2:
                      dayOfWeek2 = "Tuesday";
                      break;
                case 3:
                      dayOfWeek2 = "Wednesday";
                      break;
                case 4:
                      dayOfWeek2 = "Thursday";
                      break;
                case 5:
                      dayOfWeek2 = "Friday";
                      break;
                case 6:
                      dayOfWeek2 = "Saturday";
            }
            $("#day_of_week2").html(dayOfWeek2);
            alert(dayOfWeek2);

            var DoW3 = new Date();
            var dayOfWeek3 = DoW3.getDay();
            $("#day_of_week3").html(dayOfWeek3);

            var DoW4 = new Date();
            var dayOfWeek4 = DoW4.getDay();
            $("#day_of_week4").html(dayOfWeek4);

            var DoW5 = new Date();
            var dayOfWeek5 = DoW5.getDay();
            $("#day_of_week5").html(dayOfWeek5);

            var DoW6 = new Date();
            var dayOfWeek6 = DoW6.getDay();
            $("#day_of_week6").html(dayOfWeek6);

            var DoW7 = new Date();
            var dayOfWeek7 = DoW7.getDay();
            $("#day_of_week7").html(dayOfWeek7);
            */
            //function that takes JSON date text and makes it compatible with getDay()
          /*  var dateText = "";
            function convertJSONTime (dateText) {
              var dateSplitter = dateText.split("-");
              var year = dateSplitter[0];
              var month = dateSplitter[1].getMonth();
              var day = dateSplitter[2];

              var timeSplitter = dateText.split(" ");
              var time = timeSplitter[1];

              var concatinatedDateTime = month+" "+day+", "+year+" "+time;
              return concatinatedDateTime;
            }
          */
        });
        /* TO-DO: */
        //create another funciton that takes the day from JSON and converts to day of week (mon, tues, etc.) for table
        //var miles_driving = Number($("#miles_driving").val())??;

        //create other function that takes in the JSON weather and make an if statement if snow(JSON var) then display icon
    }
    //calling the function
    weatherAsk();

    //var button = $("#submit");
    //asking for weatherAsk(); when pressing button in if statement

    //enter key updates weather
    var ENTER_KEY = 13;
    $(document).keyup(function (evt) {
        if (evt.which === ENTER_KEY) {
            weatherAsk();
        }
    });

    // variables global to the project
    //var variable_name = 0;
    var pay_rate = 0;
    var travelers = 0;
    var food_cost = 0;
    var audio_users = 0;
    var audio_rate = 0;
    var video_users = 0;
    var video_rate = 0;
    var plan_data = 0;
    var plan_overage = 0;
    var audio_user_daily_data = 0;
    var video_user_daily_data = 0;
    var total_user_daily_data = 0;
    var total_daily_data = 0;

    function mbpsToGBpd(Mbps) {
        // This converts Megabits per second items into Gigabytes per day
        // This is used when calculating data service overages
        var MbToMBRatio = 8; //ratio of Megabits per Megabyte
        var MBToGBRatio = 1024; // ratio of Megabytes per Gigabyte
        var secPerDay = 24 * 60 * 60; // number of seconds in a day 24h * 60m/h * 60s/m
        var MBps = Mbps / MbToMBRatio; // calculate Megabytes per Second
        var GBps = MBps / MBToGBRatio; // calculate Gigabytes per Second
        var GBpd = GBps * secPerDay; // calculate Gigabytes per Day
        return GBpd;
    }

    function addCheckboxValues(groupName) {
        // This checks all of the checkboxes in a group and adds up the total!
        var total = 0;
        // this loop goes through all checked elements of "groupName" and adds them
        // note use of 'ignore' instead of expected 'index':
        // this is to pass jslint validation, but is a good practice for
        // parameter that isn't used
        $("input[name='" + groupName + "']:checked").each(function (ignore, element) {
            total += Number($(element).val());
        });

        return total;
    }

    function getCommonCosts() {
        //function reads values from the "common costs" area of the form
        //returns the total cost calculated based on fields and static values

        //---- FORM VALUES ----

        //average pay rate per user in dollars
        pay_rate = Number($("#pay_rate").val());
        console.log("pay_rate " + pay_rate);

        //total number of travelers
        travelers = Number($("#travelers").val());
        console.log("travelers " + travelers);

        //using select instead of radio
        //base food cost per traveler
        food_cost = $("option[name='food_cost']:checked").val();
        console.log("food_cost " + food_cost);

        //number of audio stream users
        audio_users = Number($("#audio_users").val());
        console.log("audio_users " + audio_users);

        //audio rate in Megabits per second
        audio_rate = Number($("#audio_rate").val());
        console.log("audio_rate " + audio_rate);

        //number of video stream users
        video_users = Number($("#video_users").val());
        console.log("video_users " + video_users);

        //video rate in Megabits per second
        video_rate = Number($("#video_rate").val());
        console.log("video_rate " + video_rate);

        //cell plan data cap
        //use gigabyte function
        plan_data = Number($("#plan_data").val());
        console.log("plan_data " + plan_data);

        //using select again
        //cell plan cost per Gigabyte (per month) over data cap
        plan_overage = $("option[name='plan_overage']:checked").val();
        console.log("plan_overage " + plan_overage);

        //calculate audio users daily data
        audio_user_daily_data = audio_users * mbpsToGBpd(audio_rate);
        console.log("audio_user_daily_data " + audio_user_daily_data);

        //calculate video users daily data
        video_user_daily_data = video_users * mbpsToGBpd(video_rate);
        console.log("video_user_daily_data " + video_user_daily_data);

        //add audio and video together for total daily data
        total_daily_data = audio_user_daily_data + video_user_daily_data;
        console.log("total_user_daily_data " + total_user_daily_data);
    }

    function getCarCosts() {
        //function reads values from the "car related costs" area of the form
        //returns the total cost calculated based on fields and static values

        //---- FORM VALUES ----

        //total number of CAR DRIVING miles
        var miles_driving = Number($("#miles_driving").val());
        console.log("miles_driving " + miles_driving);

        //maximum number of miles our group will drive per day
        var maximum_daily_miles = Number($("#maximum_daily_miles").val());
        console.log("maximum_daily_miles " + maximum_daily_miles);

        //estimated wear and tear cost PER MILE
        var wear_per_mile = Number($("#wear_per_mile").val());
        console.log("wear_per_mile " + wear_per_mile);

        //average MPG rate
        var average_miles_per_gallon = Number($("#average_miles_per_gallon").val());
        console.log("average_miles_per_gallon " + average_miles_per_gallon);

        //average cost of gas per gallon
        var cost_per_gallon = Number($("#cost_per_gallon").val());
        console.log("cost_per_gallon " + cost_per_gallon);

        //estimated cost of hotel per night
        var hotel_cost_per_night = Number($("#hotel_cost_per_night").val());
        console.log("hotel_cost_per_night " + hotel_cost_per_night);

        //a "fudge factor" to add-in unaccounted for discounts for driving
        var car_discount = Number($("#car_discount").val());
        console.log("car_discount " + car_discount);

        //average cost PER DAY to park
        var parking_cost_per_day = Number($("#parking_cost_per_day").val());
        console.log("parking_cost_per_day " + parking_cost_per_day);

        //---- CALCULATED VALUES ----
        //calculate total number of gallons of gas used on trip
        var number_of_gallons = miles_driving / average_miles_per_gallon;
        console.log("number_of_gallons " + number_of_gallons);

        //calculate total cost of gas for trip
        var total_mileage_cost = number_of_gallons * cost_per_gallon;
        console.log("total_mileage_cost " + total_mileage_cost);

        //calculate number of days in car
        var number_of_days_by_car = miles_driving / maximum_daily_miles;
        console.log("number_of_days_by_car " + number_of_days_by_car);

        //calculate per day food cost
        var per_day_food_cost = food_cost * travelers;
        console.log("per_day_food_cost " + per_day_food_cost);

        //calculate total trip food cost
        var total_car_food_cost = number_of_days_by_car * per_day_food_cost;
        console.log("total_car_food_cost " + total_car_food_cost);

        //calculate total usage for the whole trip
        var total_car_data = total_daily_data * number_of_days_by_car;
        console.log("total_car_data " + total_car_data);

        //Uses Math.ceil() to round up to nearest full Gigabyte
        var adjusted_total_car_data = Math.ceil(total_car_data - plan_data);
        console.log("adjusted_total_car_data " + adjusted_total_car_data);

        //Uses Conditional operator to multiply the rate * the overage amount or zero if there is no overage

        var total_car_data_cost = (adjusted_total_car_data > 0)
            ? (plan_overage * adjusted_total_car_data)
            : 0;
        /*
        var total_car_data_cost = adjusted_total_car_data;
            if (adjusted_total_car_data > 0) {
              total_car_data_cost = (plan_overage * adjusted_total_car_data);
            }
            else {
              total_car_data_cost = 0;
            }
        */
        console.log("total_car_data_cost " + total_car_data_cost);

        //Round the number of days DoWn to get nights. If it's less than a day, no hotel needed
        var adjusted_number_of_days_by_car = Math.floor(number_of_days_by_car);
        var total_hotel_cost = adjusted_number_of_days_by_car * hotel_cost_per_night;

        if (adjusted_number_of_days_by_car < 1) {
            total_hotel_cost = 0;
        }

        console.log("total_hotel_cost " + total_hotel_cost);

        //Calculate the total car wear and tear for the trip
        var total_car_wear = miles_driving * wear_per_mile;
        console.log("total_car_wear " + total_car_wear);

        //might have to make an if statement if less than a day, zero parking cost
        //Calculate the total cost of parking for the trip
        var total_car_parking_cost = parking_cost_per_day * (miles_driving / maximum_daily_miles);
        console.log("total_car_parking_cost " + total_car_parking_cost);

        //Round the number of days UP, then multiple by 8 to get hours per day
        var car_payrate = Math.ceil(travelers * pay_rate * 8);
        console.log("car_payrate " + car_payrate);

        var total_car_cost = total_car_food_cost + total_mileage_cost +
                total_car_data_cost + total_hotel_cost +
                total_car_parking_cost + total_car_wear -
                car_discount + car_payrate;
        console.log("total_car_cost " + total_car_cost);

        return total_car_cost;
    }

    function getFlightCosts() {
        //function reads values from the "flight related costs" area of the form
        //returns the total cost calculated based on fields and static values

        //---- FORM VALUES ----

        var cost_per_bag = Number($("#cost_per_bag").val());
        console.log("cost_per_bag " + cost_per_bag);

        var flight_speed = Number($("#flight_speed").val());
        console.log("flight_speed " + flight_speed);

        var airport_hours = Number($("#airport_hours").val());
        console.log("airport_hours " + airport_hours);

        var miles_flying = Number($("#miles_flying").val());
        console.log("miles_flying " + miles_flying);

        var flight_cost = Number($("#flight_cost").val());
        console.log("flight_cost " + flight_cost);

        var flight_transit_cost = Number($("#flight_transit_cost").val());
        console.log("flight_transit_cost " + flight_transit_cost);

        var flight_discount = Number($("#flight_discount").val());
        console.log("flight_discount " + flight_discount);

        var flight_amenities = Number(addCheckboxValues($("flight_amenities")));
        console.log("flight_amenities " + flight_amenities);

        var checked_bags_per_traveler = Number($("#checked_bags_per_traveler").val());
        console.log("checked_bags_per_traveler " + checked_bags_per_traveler);

        var in_flight_amenities = Number(addCheckboxValues($("in_flight_amenities")));
        console.log("in_flight_amenities " + in_flight_amenities);

        //---- CALCULATED VALUES ----

        // calculate flight_food_cost as one meal per traveler
        var total_flight_food_cost = food_cost * travelers;
        console.log("total_flight_food_cost " + total_flight_food_cost);

        // calculate total usage at ??both airports?? since total_daily_data
        // is DAILY, we need to divide by 24 to get hourly
        var total_flight_data = (total_daily_data * airport_hours) / 24;
        console.log("total_flight_data " + total_flight_data);

        // Uses Math.ceil() to round up to nearest full Gigabyte
        var adjusted_total_flight_data = Math.ceil(total_flight_data - plan_data);
        console.log("adjusted_total_flight_data " + adjusted_total_flight_data);

        // Uses Conditional operator to multiply the rate * the overage amount
        // or zero if there is no overage
        var total_flight_data_cost = (adjusted_total_flight_data > 0)
            ? (plan_overage * adjusted_total_flight_data)
            : 0;

        console.log("total_flight_data_cost " + total_flight_data_cost);

        var total_traveler_flight_cost = total_flight_data_cost;
        console.log("total_traveler_flight_cost " + total_traveler_flight_cost);

        //in hours
        var time_of_flight = (miles_flying / flight_speed);
        console.log("time_of_flight " + time_of_flight);

        var total_amenities = in_flight_amenities + flight_amenities;
        console.log("total_amenities " + total_amenities);

        var total_payrate_cost = pay_rate * ((time_of_flight * 2) + airport_hours) *
                travelers;
        console.log("total_payrate_cost " + total_payrate_cost);

        var total_flight_checked_bags_cost = cost_per_bag * checked_bags_per_traveler;
        console.log("total_flight_checked_bags_cost " + total_flight_checked_bags_cost);

        var total_flight_cost = total_traveler_flight_cost + total_amenities +
                total_flight_checked_bags_cost - flight_discount +
                total_flight_food_cost + total_flight_data_cost +
                total_payrate_cost;
        console.log("total_flight_cost " + total_flight_cost);

        /*
        //Round the number of days DoWn to get nights. If it's less than a day, no hotel needed
        //from hours to days in days
        var adjusted_number_of_days_by_flight = Math.floor((time_of_flight / 24));
        var total_hotel_cost = adjusted_number_of_days_by_flight * hotel_cost_per_night;

        if (adjusted_number_of_days_by_flight < 1) {
          total_hotel_cost = 0;
        }

        console.log("total_hotel_cost " + total_hotel_cost);

        return total_flight_cost;
        */
    }
    //change cost1 and cost2 to the function, set first to variable
    function showResult(cost1, cost2) {
        if (cost1 < cost2) {
            $("#results").html($("<img>").attr(
                "src",
                "assets/car.jpeg"
            )).slideDown("slow").fadeIn("slow");
            $("#travel_calculator").fadeTo("slow", 0.2);
        } else {
            $("#results").html($("<img>").attr(
                "src",
                "assets/plane.jpeg"
            )).slideDown("slow").fadeIn("slow");
            $("#travel_calculator").fadeTo("slow", 0.2);
        }
    }

    function checkTravelers() {
        // Get the values of travelers, audio streamers, and video streamers
        // Number of audio streams can't be greater than total travelers
        // Number of video streams can't be greater than total travelers - 1
        // NOTE: someone can watch video with a different audio stream
        //
        // For example, a Lynda.com video + some streaming music

        //making it equal to input tag id's again? should we then make a new var then?
        /*
        travelers = Number($("#travelers").val());
        audio_users = Number($("#audio_users").val());
        video_users = Number($("#video_users").val());
        */

        // more people can't stream video than total travelers
        // NOTE: we take care of the fact that drivers can't watch video by subtracting 1

        if (video_users > travelers - 1) {
            //reset number of video streams
            $("#video_users").val(travelers - 1);
        }
        // more people can't stream audio than total travelers
        if (audio_users > travelers) {
            //reset number of audio streams
            $("#audio_users").val(travelers);
        }
    }

    function updateResults() {
        getCommonCosts();
        checkTravelers();

        showResult(getCarCosts(), getFlightCosts());
    }

    $("#results").click(function () {
        $("#results").slideUp("slow").fadeOut("slow");
        $("#travel_calculator").fadeTo("slow", 1);
    });
    var ESCAPE_KEY = 27;
    $(document).keyup(function (evt) {
        if (evt.which === ESCAPE_KEY) {
            $("#results").slideUp("slow").fadeOut("slow");
            $("#travel_calculator").fadeTo("slow", 1);
        }
    });
    $("#travelers").change(function () {
        checkTravelers();
    });
    $("#audio_users").change(function () {
        checkTravelers();
    });
    $("#video_users").change(function () {
        checkTravelers();
    });
    $("#update_button").focus();
    $("#update_button").click(function () {
        updateResults();
    });
});
