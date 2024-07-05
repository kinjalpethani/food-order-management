const ajaxCall = (data, url) => {
    let retVal;
    $.ajax({
        async : false,
        type : "POST",
        url : url,
        dataType : 'json',
        headers : {'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')},
        data : data,
        success : function (res) {
            retVal = res;
        }
    });
    return retVal;
};

$(document).on('click', '.like-btn', function () {
    const id = $(this).attr('data-id');
    ajaxCall({product_id : $(this).attr('data-id')}, addUrl);
    $(this).closest('.like-btn').find('img').attr('src', unfavImage);
    $(this).removeClass('like-btn').addClass('unlike-btn');
});

$(document).on('click', '.unlike-btn', function () {
    const id = $(this).attr('data-id');
    let res = ajaxCall({product_id : $(this).attr('data-id')}, removeUrl);

    if ($(this).attr('data-info') === 'favrourite') {
        if (res.count === 0) {
            window.location.reload();
        }
        $(this).closest('.fav_box_' + id).delay(100).fadeOut(1000);
    } else {
        $(this).closest('.unlike-btn').find('img').attr('src', favImage);
        $(this).removeClass('unlike-btn').addClass('like-btn');
    }
});

// Increment quantity and show price based on that
$(document).on('click', '.plus', function () {
    $('#quantity').val(parseInt($('#quantity').val()) + 1);
    $('.total_quantity').text($('#quantity').val());
    $('.display_price').text('$' + (parseInt($('#quantity').val()) * parseFloat($(this).parent().find("input[class=total_cart_price]").val())).toFixed(2));
});

// decrease quantity and show price based on that
$(document).on('click', '.minus', function () {
    if ($('#quantity').val() >= 2) {
        $('#quantity').val(parseInt($('#quantity').val()) - 1);
        $('.total_quantity').text($('#quantity').val());
        $('.display_price').text('$' + (parseInt($('#quantity').val()) * parseFloat($(this).parent().find("input[class=total_cart_price]").val())).toFixed(2));
    }
});

// Show product detail on popup
$(document).on('click', '.popupModal', function (e) {
    e.preventDefault();
    $.ajax({
        url : $(this).attr('data-url'),
        type : 'get',
        success : function (res) {
            $('.modelData').html(res.view);
            $('#modal').modal('show');
        }
    });
});

//Add item to the cart
$(document).on('click', '.addToCart', function () {
    let res = ajaxCall({
        product_id : $('#product_id').val(),
        'quantity' : $('#quantity').val()
    }, $(this).attr('data-url'));

    if (res.success) {
        setTimeout(function () {
            window.location.reload();
        }, 100);
    }
});

// Remove item from the cart
$(document).on('click', '.removeCart', function (e) {
    e.preventDefault();
    let res = ajaxCall({product_id : $(this).attr('data-id')}, $(this).attr('href'));
    if (res.count === 0) {
        window.location.reload();
    } else {

        $(this).closest('li').delay(100).fadeOut(100);
        $('.cart_count').text(res.count);
        let total_price = (parseFloat($('#total_cart_price').val()) - (parseInt($('#quantity_' + $(this).attr('data-id')).val()) * parseFloat($(this).parent().find("input[class=cart_price]").val()))).toFixed(2);
        $('.total_cart_price').text('$' + total_price);
        $('#total_cart_price').val(total_price);
    }
});

// In cart page, increment quantity and show price based on that
$(document).on('click', '.cart_plus', function () {
    let id = $(this).attr('data-id');
    $('#quantity_' + id).val(parseInt($('#quantity_' + id).val()) + 1);
    $('.total_quantity_' + id).text($('#quantity_' + id).val());
    $('.display_price_' + id).text('$' + (parseInt($('#quantity_' + id).val()) * parseFloat($(this).parent().find("input[class=cart_price]").val())).toFixed(2));

    let total_price = (parseFloat($('#total_cart_price').val()) + parseFloat($(this).parent().find("input[class=cart_price]").val())).toFixed(2);
    $('.total_cart_price').text('$' + total_price);
    $('#total_cart_price').val(total_price);
    ajaxCall({product_id : id, 'quantity' : 1}, $(this).attr('data-url'));

});

// In cart page, decrease quantity and show price based on that
$(document).on('click', '.cart_minus', function () {
    let id = $(this).attr('data-id');
    if ($('#quantity_' + id).val() >= 2) {
        $('#quantity_' + id).val(parseInt($('#quantity_' + id).val()) - 1);
        $('.total_quantity_' + id).text($('#quantity_' + id).val());
        $('.display_price_' + id).text('$' + (parseInt($('#quantity_' + id).val()) * parseFloat($(this).parent().find("input[class=cart_price]").val())).toFixed(2));

        let total_price = (parseFloat($('#total_cart_price').val()) - parseFloat($(this).parent().find("input[class=cart_price]").val())).toFixed(2);
        $('.total_cart_price').text('$' + total_price);
        $('#total_cart_price').val(total_price);
        ajaxCall({product_id : id, 'quantity' : 1}, $(this).attr('data-url'));
    }
});