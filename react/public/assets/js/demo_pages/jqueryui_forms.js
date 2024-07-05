/* ------------------------------------------------------------------------------
 *
 *  # jQuery UI forms
 *
 *  Demo JS code for jqueryui_forms.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var JqueryUiForms = function() {


    //
    // Setup module components
    //

    // Datepicker
    var _componentUiDatepicker = function() {
        if (!$().datepicker) {
            console.warn('Warning - jQuery UI components are not loaded.');
            return;
        }

        // Default functionality
        $('.datepicker').datepicker({
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Dates in other months
        $('.datepicker-dates').datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Button bar
        $('.datepicker-button-bar').datepicker({
            showButtonPanel: true,
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Month and year menu
        $('.datepicker-menus').datepicker({
            changeMonth: true,
            changeYear: true,
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Multiple months
        $('.datepicker-multiple').datepicker({
            numberOfMonths: 3,
            showButtonPanel: true,
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Icon trigger
        $('.datepicker-icon').datepicker({
            showOn: 'button',
            buttonImage: '../../../../global_assets/images/ui/datepicker_trigger.png',
            buttonImageOnly: true,
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Populate alternate field
        $('.datepicker-alternate').datepicker({
            altField: '#alternate',
            altFormat: 'DD, d MM, yy',
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Restrict date range
        $('.datepicker-restrict').datepicker({ 
            minDate: -20,
            maxDate: '+1M +10D',
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Show week number
        $('.datepicker-weeks').datepicker({
            showWeek: true,
            firstDay: 1,
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });


        //
        // Date range
        //

        // From
        $('#range-from').datepicker({
            numberOfMonths: 2,
            defaultDate : new Date(),
            format : 'mm/dd/yyyy',
            onClose: function( selectedDate ) {
                $( '#range-to' ).datepicker( 'option', 'minDate', selectedDate );
            },
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        }).datepicker("setDate",'now');

        // To
        $('#range-to').datepicker({
            defaultDate : new Date(),
            numberOfMonths: 2,
            format : 'mm/dd/yyyy',
            onClose: function( selectedDate ) {
                $( '#range-from' ).datepicker( 'option', 'maxDate', selectedDate );
            },
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        }).datepicker("setDate",'now');


        //
        // Format date
        //

        // Initialize
        $('.datepicker-format').datepicker({
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Format date on change
        $('#format').on('change', function() {
            $('.datepicker-format').datepicker('option', 'dateFormat', $(this).val());
        });


        //
        // Format date
        //

        // Initialize
        $('.datepicker-animation').datepicker({
            isRTL: $('html').attr('dir') == 'rtl' ? true : false
        });

        // Animate picker on change
        $('#anim').on('change', function() {
            $('.datepicker-animation').datepicker('option', 'showAnim', $(this).val());
        });
    };

    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentUiDatepicker();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    JqueryUiForms.init();
});
