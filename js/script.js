const $colorArray = $("#color").toArray();
const cornFlowerBlue = $colorArray[0][0];
const darkSlateGrey = $colorArray[0][1];
const gold = $colorArray[0][2];
const tomato = $colorArray[0][3];
const steelBlue = $colorArray[0][4];
const dimGrey = $colorArray[0][5];
const unavailable = `<div id="unavailable">This item has a scheduling conflict and is not available.</div>`;
let total = 0;
let formHtml = '<div class="message"> Please enter a valid credit card number</div>';


//Places the first field in the focus state on page load
$('#name').focus();

//Hides the "Job Role" text box with JavaScript initially, then shows it with JS upon selection of Job Role when a valid
//role is de-selected
$('#other-title').hide('#other-title');
$('#title').change(function (){
  //let $str = $(this).find("option:selected").text();
  if($('#title').val()=== 'other'){
    $('#other-title').fadeIn();
  }
  if ($('#title').val() !== 'other'){
    $('#other-title').fadeOut('#other-title');
  }
});

//Hides the Color Menu until a design is selected
$('#colors-js-puns').hide('colors-js-puns');

// When a theme is selected display color options "Please select a T-shirt theme"
// Only displays the color options that match the theme selected
// When a new theme is selected the color field and drop down menu update
$('#design').change(function() {
  let $str = $('#design').find("option:selected").text();
  console.log($('color').val());
  if(($str.indexOf("Puns")) > 0) {
    $('#color').empty()
        .append(darkSlateGrey)
        .append(gold)
        .append(cornFlowerBlue)
        .append('<option value="Please_select">Please select a T-shirt theme...</option>');
    $('#colors-js-puns').fadeIn('colors-js-puns');
  }
  else if(($str.indexOf("I")) > 0){
    $('#color').empty()
        .append(steelBlue)
        .append(dimGrey)
        .append(tomato)
        .append('<option value="Please_select">Please select a T-shirt theme...</option>');
  }
  if(($str.indexOf("Select")) >= 0) {
    $('#colors-js-puns').fadeOut('colors-js-puns');
  }
});


//As a user enters their email address the email address is dynamically checked for validity
$('#mail').keyup(function (e){
  let email = $('#mail').val();
  let emailHtml = '<div id="mail-html" class="mail">Please enter a valid email address.</div>';
  email = /^[^@]+@[^@.]+\.[a-z]+$/i.exec(email);
  if (email === null){
    if($('.mail').length < 1) {
      $('[for=mail]').append(emailHtml);
    }
  } else {
    $('.mail').remove();
  }
});


//Detects a conflict in check boxes
$('input:checkbox').click(function (event){
  let $notChecked = $('input[type=checkbox]').not(':checked');
  //compare the clicked checkbox to the unclicked checkboxes and disable all matching dates/times
  let thisDay = returnDay($(this));
  let thisTime = returnTime($(this));
  let $disabledCheckbox = [];
  //removes the target from the $notChecked array
  $notChecked = $.grep($notChecked, function(e){
    return e !== event.target;
  });
  //removes the "Main Conference from $notChecked due to it not having the data-day-and-time attribute
  $notChecked = $.grep($notChecked, function(e){
    return e !== $('[name=all]')[0];
  });

  //updates the value of total based on the class selections
  if($(this).prop('checked')){
    total += parseInt(/[0-9]{3}/.exec($(this).attr('data-cost')));
  } else {
    total += -(parseInt(/[0-9]{3}/.exec($(this).attr('data-cost'))));
  }

  // Searches the unchecked checkboxes for conflicting times and appends a tag to any time/day conflicts

  $.each($notChecked, function () {
    if ($(this).attr('data-day-and-time')) {
      let day = returnDay($(this));
      let time = returnTime($(this));
      if ((thisDay === null)) {
        return
      }else if ((thisDay[0] === day[0]) && (thisTime[0] === time[0])) {
        $(this).attr('disabled', true);
        $(this).closest('label').append(unavailable);
        $disabledCheckbox.push($(this));
      }
    }
  });

  //select the disable link which corresponds to the conflict and when the conflict is resolved (box unchecked)
  //remove the corresponding div and enable the correct disabled checkbox
  if(!$(event.target).is(':checked')){
    $.each($disabledCheckbox, function () {
      if ($(this).attr('data-day-and-time')) {
        let day = returnDay($(this));
        let time = returnTime($(this));
        $disabledCheckbox = $.grep($disabledCheckbox, function (e) {
          if ((thisDay[0] === day[0]) && (thisTime[0] === time[0])) {
            $disabledCheckbox[0].siblings('#unavailable').remove();
            $disabledCheckbox[0].attr('disabled', false);
            return e !== event.target;
          }
        });
      }
    });
  }
  //sends the total cost of all selections to the updateTotalField function
  updateTotalField(total);
});

//accepts an object and returns the day value in data-day-and-time
function returnDay (object){
  return /\b(monday|tuesday|wednesday|thurday|friday|saturday|sunday)\b/i.exec($(object).attr('data-day-and-time'));
}

//accepts an object and return the time value in data-day-and-time
function returnTime (object){
  return /(([0-9]?[0-9])(am|pm))-?([0-9]?[0-9])(am|pm)/.exec($(object).attr('data-day-and-time'));
}

//Appends the total cost of all classes and updates based on checked activities
function updateTotalField (){
  let $totalField =`<div id="total" class="total-cost">The total cost is:  </div>`;
  $('#total').remove();
  $('#total').remove();
  $('#payment').parent().prepend($totalField);
  $('#payment').parent().append($totalField);
  $('.total-cost').html(`The total cost is:  $${total}`);
}

// Set the payment menu to the credit card by default, show the credit card field and hide the bitcoin and paypal paragraphs
$('#payment').val('credit card');
$('#p-bitcoin').hide();
$('#p-paypal').hide();
//when payment options are selected the display updates accordingly
$('#payment').change(function(){
  let value = this.value;
  let $option = $('option:selected', this);
  if (value === 'paypal'){
    $('#p-paypal').show();
    $('#credit-card').hide();
    $('#p-bitcoin').hide();
  }
  if (value === 'bitcoin'){
    $('#p-bitcoin').show();
    $('#credit-card').hide();
    $('#p-paypal').hide();
  }
  if (value === 'credit card'){
    $('#credit-card').show();
    $('#p-bitcoin').hide();
    $('#p-paypal').hide();
  }
});

//Validates the credit card number and alerts the user of invalid numbers
//An invalid credit card entry displays one message
//A credit card of a different length displays another message
$('#cc-num').keyup(function (e){
  let ccHtml = '<div class="cc-message"> Please enter a number between 13 and 16 digits long.</div>';
  let ccNum = $('#cc-num').val();
  let ccEmptyHtml = '<div class="cc-empty-message"> Please enter a credit card number.</div>';
  ccNum = /^((([0-9]{13,14})?|(([0-9]{15,16}?)?))?|([0-9]{4}-)([0-9]{4})[-]?([0-9]{4})[-]?([0-9]{4}))$/.exec(ccNum);
  let $parent = $('.col-6').children();
  //if cc-num is greater than 12 append a message and remove when false
  if($('#cc-num').val().length > 12 ){
    if (ccNum !== null) {
      $('.message').remove();
      $('.cc-message').remove();
    } else if (ccNum === null) {
      if ($parent.length < 3) {
        $('#cc-num').parent().prepend(formHtml);
      }
    }
  }
  //if cc-num is less than 12 append a message and remove when false
  if($('#cc-num').val().length < 12 ) {
    if ($parent.length < 3) {
      $('#cc-num').parent().prepend(ccHtml);
    }
  }
  //if cc-num is blank append a different message
  if($('#cc-num').val().length === 0){
    $('.message').remove();
    $('.cc-message').remove();
    $('#cc-num').parent().prepend(ccEmptyHtml);
  } else {
    $('.cc-empty-message').remove();
  }
});

//Validation of fields and form submission on clicking the register button
$('button').click(function(e){
  e.preventDefault();
  let validationHtml = '<div class="message"> Please verify the information below is accurate.</div>';
  let activitiesHtml = '<div class="activity-message"> Please select one of the above classes.</div>';
  let ccNum = $('#cc-num').val();
  let ccZip = $('#zip').val();
  let cvv = $('#cvv').val();
  let name = $('#name').val();
  let email = $('#mail').val();
  let ccValid = false;
  let totalValid = false;
  let zipValid = false;
  let cvvValid = false;
  let nameValid = false;
  let emailValid = false;

  //Validates the credit card number is entered correctly
  ccNum = /^((([0-9]{13,14})?|(([0-9]{15,16}?)?))?|([0-9]{4}-)([0-9]{4})[-]?([0-9]{4})[-]?([0-9]{4}))$/.exec(ccNum);
  cvv = /^[0-9]{3}$/.exec(cvv);
  email = /^[^@]+@[^@.]+\.[a-z]+$/i.exec(email);

  //Verifies the zip code has the correct length
  ccZip = /^[0-9]{5}$/.exec(ccZip);

  // Verifies the credit card number is valid
  if (((ccNum === null) ||(ccNum[0] === '') ) && ($('#payment').val() === 'credit card')){
    alert('Please enter a valid credit card number');
  } else if (((ccNum !== null) ||(ccNum[0] !== '') ) && ($('#payment').val() === 'credit card')){
    ccValid = true;
  }

  // Verifies an activity has been selected
  if ((total <= 0)){
    totalValid = false;
  }
  if ((total <= 0) && ($('.activities').children().length) < 9){
    $('.activities legend').parent().append(activitiesHtml);
  }else if ((total > 0) && ($('.activities').children().length) === 9){
    $('.activity-message').remove();
    totalValid = true;
  } else if ((total > 0)){
    totalValid = true;
  }

  // Validates the Zipcode
  if (ccZip === null){
    if(($('#zip').siblings().length < 2)) {
      $('#zip').parent().prepend(validationHtml);
    }
  } else if (($('#zip').siblings().length === 2) && ccZip !== null ) {
    $('#zip').parent().children('.message').remove();
    zipValid = true;
  } else {
    zipValid = true;
  }

  //Validates the CVV
  if (cvv === null){
    if(($('#cvv').siblings().length < 2)) {
      $('#cvv').parent().prepend(validationHtml);
    }
  } else if (($('#cvv').siblings().length === 2) && cvv !== null ) {
    $('#cvv').parent().children('.message').remove();
    cvvValid = true;
  } else {
    cvvValid = true;
  }

  //Validates the name field has data
  if (name.length > 0){
    nameValid = true;
  } else {
    nameValid = false;
  }

  //Validates an email has been entered
  if ((email === null) || (name.length === 0)) {
    if($('#name').siblings().length === 7) {
      $('[for=name]').parent().prepend(validationHtml);
    }
  }else if ((email.length > 0) && (($('#name').siblings().length === 7) || ($('#name').siblings().length === 8) ) && (name.length > 0)){
    emailValid = true;
    $('[for=name]').siblings('.message').remove();
  }

  // Checks entire form validation and allows form submission if all areas evaluate to validated
  if ((ccValid === true) && (totalValid === true) && (zipValid === true) && (cvvValid === true) && (nameValid === true) && (emailValid === true) ) {
    alert('form validation was completed successfully');
    $('form').submit();
  } else if (($('#payment').val() === 'paypal') && (totalValid === true) && (nameValid === true) && (emailValid === true)){
    alert('form validation was completed successfully');
    $('form').submit();
  } else if (($('#payment').val() === 'bitcoin') && (totalValid === true) && (nameValid === true) && (emailValid === true)) {
    alert('form validation was completed successfully');
    $('form').submit();
  }
});
