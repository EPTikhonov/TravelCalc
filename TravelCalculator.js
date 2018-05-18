$(function () {
    "use strict";

    // openweathermap API
    var api = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var input = "Chicago, US"; // default loaded
    var units = "&units=imperial";
    var apiKey = "&appid=********************************"; // Get Your Own API key from http://api.openweathermap.org

    // getting weather
    function getWeatherInfo() {

          $.ajax({
            url: api+input+units+apiKey,
            dataType: "json",
            success: function (data) {

              // setting weather information
              $("#day_1_icon").html(getWeatherIcon(data.list[0].weather[0].icon));
              var high_temp1 = getHighTemp(0, 1);
              $("#day_1_high").html(high_temp1);
              var low_temp1 = getLowTemp(0, 1);
              $("#day_1_low").html(low_temp1);

              $("#day_2_icon").html(getWeatherIcon(data.list[6].weather[0].icon));
              $("#dayOfWeek2").html(getWeekDay(data.list[6].dt_txt));
              var high_temp2 = getHighTemp(2, 9);
              $("#day_2_high").html(high_temp2);
              var low_temp2 = getLowTemp(2, 9);
              $("#day_2_low").html(low_temp2);

              $("#day_3_icon").html(getWeatherIcon(data.list[14].weather[0].icon));
              $("#dayOfWeek3").html(getWeekDay(data.list[14].dt_txt));
              var high_temp3 = getHighTemp(10, 17);
              $("#day_3_high").html(high_temp3);
              var low_temp3 = getLowTemp(10, 17);
              $("#day_3_low").html(low_temp3);

              $("#day_4_icon").html(getWeatherIcon(data.list[22].weather[0].icon));
              $("#dayOfWeek4").html(getWeekDay(data.list[22].dt_txt));
              var high_temp4 = getHighTemp(18, 25);
              $("#day_4_high").html(high_temp4);
              var low_temp4 = getLowTemp(18, 25);
              $("#day_4_low").html(low_temp4);

              $("#day_5_icon").html(getWeatherIcon(data.list[30].weather[0].icon));
              $("#dayOfWeek5").html(getWeekDay(data.list[30].dt_txt));
              var high_temp5 = getHighTemp(26, 33);
              $("#day_5_high").html(high_temp5);
              var low_temp5 = getLowTemp(26, 33);
              $("#day_5_low").html(low_temp5);

              // checks all hourly predictions and gets high temp
              function getHighTemp(start, end) {
                  var high = 0;
                  for (var i = start; i <= end; i++ ) {
                        var temp = Math.ceil(data.list[i].main.temp_max);

                        if (temp > high) {
                          high = temp;
                        }
                  }
                  return high;
              }

              // checks all hourly predictions and gets low temp
              function getLowTemp(start, end) {
                  var low = getHighTemp(start, end); // start with high temp and go lower each from each iteration
                  for (var i = start; i <= end; i++ ) {
                        var temp = Math.ceil(data.list[i].main.temp_min);

                        if (temp < low) {
                          low = temp;
                        }
                  }
                  return low;
              }

              // Sets icon based on weather for each day
              // @param takes in data.list[i].weather[0].icon
              function getWeatherIcon(weatherIcon) {
                var icon = "";

                // cases values are based off of openweatherapi icon names
                switch (weatherIcon) {
                  case "01d":
                  icon ="<i class=\"fa fa-sun-o\"></i>";
                  break;
                  case "01n":
                  icon ="<i class=\"fa fa-sun-o\"></i>";
                  break;
                  case "02d":
                  icon ="<i class=\"fa fa-cloud\"></i>";
                  break;
                  case "02n":
                  icon ="<i class=\"fa fa-cloud\"></i>";
                  break;
                  case "03d":
                  icon ="<i class=\"fa fa-cloud\"></i>";
                  break;
                  case "03n":
                  icon ="<i class=\"fa fa-cloud\"></i>";
                  break;
                  case "04d":
                  icon ="<i class=\"fa fa-cloud\"></i>";
                  break;
                  case "04n":
                  icon ="<i class=\"fa fa-cloud\"></i>";
                  break;
                  case "09d":
                  icon ="<i class=\"fa fa-tint\"></i>";
                  break;
                  case "09n":
                  icon ="<i class=\"fa fa-tint\"></i>";
                  break;
                  case "10d":
                  icon ="<i class=\"fa fa-tint\"></i>";
                  break;
                  case "10n":
                  icon ="<i class=\"fa fa-tint\"></i>";
                  break;
                  case "11d":
                  icon ="<i class=\"fa fa-bolt\"></i>";
                  break;
                  case "11n":
                  icon ="<i class=\"fa fa-bolt\"></i>";
                  break;
                  case "13d":
                  icon ="<i class=\"fa fa-snowflake-o\"></i>";
                  break;
                  case "13n":
                  icon ="<i class=\"fa fa-snowflake-o\"></i>";
                  break;
                  case "50d":
                  icon ="<i class=\"fa fa-cloud\"></i>";
                  break;
                  case "50n":
                  icon ="<i class=\"fa fa-cloud\"></i>";
                  break;
                  default:
                    icon = "N/A";
                }
                return icon;
              }

              // getting week day from date of API
              function getWeekDay (dateText) {
                // split "2018-03-01 21:00:00" to year, month, day
                var dateSplitter = dateText.split("-"); // splits "-"
                var year = dateSplitter[0];
                var month = dateSplitter[1];
                var day = dateSplitter[2];
                var concatinatedDate = year+", "+month+", "+day;

                var weekDay;
                var date = new Date(concatinatedDate);
                var dayAsNum = date.getDay();

                // use switch statement with cases and return week day
                switch (dayAsNum) {
                    case 0:
                          weekDay = "Sun";
                          break;
                    case 1:
                          weekDay = "Mon";
                          break;
                    case 2:
                          weekDay = "Tues";
                          break;
                    case 3:
                          weekDay = "Wed";
                          break;
                    case 4:
                          weekDay = "Thu";
                          break;
                    case 5:
                          weekDay = "Fri";
                          break;
                    case 6:
                          weekDay = "Sat";
                }
                return weekDay;
              }

            }
          });

    }
    // calling the function
    getWeatherInfo(); // displays default weather

    // enter key updates weather
    var ENTER_KEY = 13;
    $(document).keyup(function (evt) {
        if (evt.which === ENTER_KEY) {
            input = $("#cityName").val(); // setting new input value
            getWeatherInfo();
        }
    });

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
        var MbToMBRatio = 8;
        var MBToGBRatio = 1024;
        var secPerDay = 24 * 60 * 60;
        var MBps = Mbps / MbToMBRatio;
        var GBps = MBps / MBToGBRatio;
        var GBpd = GBps * secPerDay;
        return GBpd;
    }

      // checks all of the checkboxes in a group and adds up the total
    function addCheckboxValues(groupName) {

        var total = 0;
        $("input[name='" + groupName + "']:checked").each(function (ignore, element) {
            total += Number($(element).val());
        });
        return total;
    }

    // calculates total cost from common costs area of the form
    function getCommonCosts() {

        // average pay rate per user in dollars
        pay_rate = Number($("#pay_rate").val());
        console.log("pay_rate " + pay_rate);

        // total number of travelers
        travelers = Number($("#travelers").val());
        console.log("travelers " + travelers);

        // base food cost per traveler
        food_cost = Number($("option[name='food_cost']:checked").val());
        console.log("food_cost " + food_cost);

        // number of audio stream users
        audio_users = Number($("#audio_users").val());
        console.log("audio_users " + audio_users);

        // audio rate in Megabits per second
        audio_rate = Number($("#audio_rate").val());
        console.log("audio_rate " + audio_rate);

        // number of video stream users
        video_users = Number($("#video_users").val());
        console.log("video_users " + video_users);

        // video rate in Megabits per second
        video_rate = Number($("#video_rate").val());
        console.log("video_rate " + video_rate);

        // cell plan data cap
        plan_data = Number($("#plan_data").val());
        console.log("plan_data " + plan_data);

        // cell plan cost per Gigabyte (per month) over data cap
        plan_overage = Number($("option[name='plan_overage']:checked").val());
        console.log("plan_overage " + plan_overage);

        // calculate audio users daily data
        audio_user_daily_data = audio_users * mbpsToGBpd(audio_rate);
        console.log("audio_user_daily_data " + audio_user_daily_data);

        // calculate video users daily data
        video_user_daily_data = video_users * mbpsToGBpd(video_rate);
        console.log("video_user_daily_data " + video_user_daily_data);

        // add audio and video together for total daily data
        total_daily_data = audio_user_daily_data + video_user_daily_data;
        console.log("total_user_daily_data " + total_user_daily_data);
    }

    // calculates total cost from car related costs area of the form
    function getCarCosts() {

        // total number of car driving miles
        var miles_driving = Number($("#miles_driving").val());
        console.log("miles_driving " + miles_driving);

        // maximum number of miles our group will drive per day
        var maximum_daily_miles = Number($("#maximum_daily_miles").val());
        console.log("maximum_daily_miles " + maximum_daily_miles);

        // estimated wear and tear cost per mile
        var wear_per_mile = Number($("#wear_per_mile").val());
        console.log("wear_per_mile " + wear_per_mile);

        // average MPG rate
        var average_miles_per_gallon = Number($("#average_miles_per_gallon").val());
        console.log("average_miles_per_gallon " + average_miles_per_gallon);

        // average cost of gas per gallon
        var cost_per_gallon = Number($("#cost_per_gallon").val());
        console.log("cost_per_gallon " + cost_per_gallon);

        // estimated cost of hotel per night
        var hotel_cost_per_night = Number($("#hotel_cost_per_night").val());
        console.log("hotel_cost_per_night " + hotel_cost_per_night);

        // a "fudge factor" to add-in unaccounted for discounts for driving
        var car_discount = Number($("#car_discount").val());
        console.log("car_discount " + car_discount);

        // average cost PER DAY to park
        var parking_cost_per_day = Number($("#parking_cost_per_day").val());
        console.log("parking_cost_per_day " + parking_cost_per_day);

        // calculate total number of gallons of gas used on trip
        var number_of_gallons = miles_driving / average_miles_per_gallon;
        console.log("number_of_gallons " + number_of_gallons);

        // calculate total cost of gas for trip
        var total_mileage_cost = number_of_gallons * cost_per_gallon;
        console.log("total_mileage_cost " + total_mileage_cost);

        // calculate food cost rounded up to nearest day
        var number_of_days_by_car = Math.ceil(miles_driving / maximum_daily_miles);
        console.log("number_of_days_by_car " + number_of_days_by_car);

        // calculate per day food cost
        var per_day_food_cost = travelers * food_cost;
        console.log("per_day_food_cost " + per_day_food_cost);

        // calculate total trip food cost
        var total_car_food_cost = per_day_food_cost * number_of_days_by_car;
        console.log("total_car_food_cost " + total_car_food_cost);

        // calculate total usage for the whole trip
        var total_car_data = total_daily_data * number_of_days_by_car;
        console.log("total_car_data " + total_car_data);

        // Uses Math.ceil() to round up to nearest full Gigabyte
        var adjusted_total_car_data = Math.ceil(total_car_data - plan_data);
        console.log("adjusted_total_car_data " + adjusted_total_car_data);

        // Uses Conditional operator to multiply the rate * the overage amount or zero if there is no overage
        var total_car_data_cost = (adjusted_total_car_data > 0)
            ? (plan_overage * adjusted_total_car_data)
            : 0;

        console.log("total_car_data_cost " + total_car_data_cost);

        // Round the number of days down to get nights. If it's less than a day, no hotel needed
        var total_hotel_cost = Math.floor(number_of_days_by_car) * hotel_cost_per_night;
        console.log("total_hotel_cost " + total_hotel_cost);

        // Calculate the total car wear and tear for the trip
        var total_car_wear = miles_driving * wear_per_mile;
        console.log("total_car_wear " + total_car_wear);

        // Calculate the total cost of parking for the trip
        var total_car_parking_cost = number_of_days_by_car * parking_cost_per_day;
        console.log("total_car_parking_cost " + total_car_parking_cost);

        // Round the number of days up, then multiple by 8 to get hours per day
        var car_payrate = Math.ceil(number_of_days_by_car) *
                8 * pay_rate * travelers;
        console.log("car_payrate " + car_payrate);

        var total_car_cost = total_car_food_cost + total_mileage_cost +
                total_car_data_cost + total_hotel_cost +
                total_car_parking_cost + total_car_wear -
                car_discount + car_payrate;
        console.log("total_car_cost " + total_car_cost);

        return total_car_cost;
    }

    // calculates total cost from flight related costs area of the form
    function getFlightCosts() {

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

        var flight_amenities = Number(addCheckboxValues("flight_amenities"));
        console.log("flight_amenities " + flight_amenities);

        var checked_bags_per_traveler = Number($("#checked_bags_per_traveler").val());
        console.log("checked_bags_per_traveler " + checked_bags_per_traveler);

        var in_flight_amenities = Number(addCheckboxValues("in_flight_amenities"));
        console.log("in_flight_amenities " + in_flight_amenities);

        var total_flight_food_cost = travelers * food_cost;
        console.log("total_flight_food_cost " + total_flight_food_cost);

        // calculate total usage at both airports since total_daily_data
        var total_flight_data = total_daily_data * airport_hours / 24;
        console.log("total_flight_data " + total_flight_data);

        // Uses Math.ceil() to round up to nearest full Gigabyte
        var adjusted_total_flight_data = Math.ceil(total_flight_data - plan_data);
        console.log("adjusted_total_flight_data " + adjusted_total_flight_data);

        // Uses Conditional operator to multiply the rate * the overage amount  or zero if there is no overage
        var total_flight_data_cost = (adjusted_total_flight_data > 0)
            ? (plan_overage * adjusted_total_flight_data)
            : 0;
        console.log("total_flight_data_cost " + total_flight_data_cost);

        var total_traveler_flight_cost = flight_cost * travelers;
        console.log("total_traveler_flight_cost " + total_traveler_flight_cost);

        var time_of_flight = miles_flying / flight_speed;
        console.log("time_of_flight " + time_of_flight);

        var total_amenities = (flight_amenities + in_flight_amenities) * travelers;
        console.log("total_amenities " + total_amenities);

        var total_payrate_cost = pay_rate * ((time_of_flight * 2) + airport_hours) *
                travelers;
        console.log("total_payrate_cost " + total_payrate_cost);

        var total_flight_checked_bags_cost = (checked_bags_per_traveler * cost_per_bag) *
                travelers;
        console.log("total_flight_checked_bags_cost " + total_flight_checked_bags_cost);

        var total_flight_cost = total_traveler_flight_cost + total_amenities +
                total_flight_checked_bags_cost - flight_discount +
                total_flight_food_cost + total_flight_data_cost +
                total_payrate_cost;
        console.log("total_flight_cost " + total_flight_cost);

        return total_flight_cost;
    }

    function showResult(cost1, cost2) {
        if (cost1 < cost2) {
            $("#results").html($("<img>").attr(
                "src",
                "assets/car.jpg"
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

        travelers = Number($("#travelers").val());
        audio_users = Number($("#audio_users").val());
        video_users = Number($("#video_users").val());

        // drivers cannot watch a video so - 1
        if (video_users > travelers - 1) {
            // reset number of video streams
            $("#video_users").val(travelers - 1);
        }
        // more people can't stream audio than total travelers
        if (audio_users > travelers) {
            // reset number of audio streams
            $("#audio_users").val(travelers);
        }
    }

    function updateResults() {
        getCommonCosts();
        checkTravelers(); // make certain that number of streams is reasonable!
        var car_costs = getCarCosts(); // calculate the total car costs
        var flight_costs = getFlightCosts(); // calculate total flight costs
        showResult(car_costs, flight_costs); // finally, show the result!
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
