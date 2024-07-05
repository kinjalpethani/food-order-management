$(document).ready(function () {
    $(":input").inputmask({removeMaskOnSubmit : true});
});

const hideDatatableSummary = (data) => {
    if (data.length === 0) {
        $('.datatable-footer').hide();
        $('.exportBtn').attr('recordCount', 0);
    } else {
        $('.datatable-footer').show();
        $('.exportBtn').attr('recordCount', data.length);
    }
};

$(document).on('click', '#deleteBtn', function (event) {
    let form = $(this).closest('form');
    event.preventDefault();
    Swal.fire({
        title : $(this).attr('data-msg'),
        text : '',
        type : "warning",
        showCancelButton : true,
        confirmButtonClass : "swal2-confirm btn btn-primary",
        cancelButtonClass : "swal2-cancel btn btn-light",
        confirmButtonText : "Yes",
        cancelButtonText : "Cancel",
    }).then(function (result) {
        if (result.value) {
            form.submit();
        }
    });
});

function searchRecordOnSubmit(id) {
    $('#btnFilterSubmitSearch').click(function () {
        $('#' + id).DataTable().draw(true);
        $('.searchCard').css('display', 'none');
    });
}

function searchRecordReset(id) {
    $('#btnFilterReset').click(function () {
        $('.form_' + id)[0].reset();
        $('#' + id).DataTable().draw(true);
        $('.searchCard').css('display', 'none');

        let currentDate = (new Date()).toISOString().split('T')[0];
        currentDate = currentDate.split('-');
        $('#range-from').attr('value', currentDate[1] + '/' + currentDate[2] + '/' + currentDate[0]);
        $('#range-to').attr('value', currentDate[1] + '/' + currentDate[2] + '/' + currentDate[0]);
    });
}

function searchOnEnterForm(id) {

    $('.form_' + id).on("submit", function (e) {
        $('#' + id).DataTable().draw(true);
        $('.searchCard').css('display', 'none');
        e.preventDefault();
    });
}

$(document).on('click', '.changeStatus', function () {
    const url = $(this).attr('data-url');
    const id = $(this).attr('data-id');
    Swal.fire({
        title : 'Are you sure you want to change status of ' + $(this).attr('data-name'),
        text : '',
        type : "warning",
        showCancelButton : true,
        confirmButtonClass : "swal2-confirm btn btn-primary",
        cancelButtonClass : "swal2-cancel btn btn-light",
        confirmButtonText : "Yes",
        cancelButtonText : "Cancel",
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                type : "POST",
                url : url,
                dataType : 'json',
                headers : {'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')},
                data : {id : id},
                success : function (response) {
                    if (response) {
                        window.location.reload();
                    }
                }
            });
        }
    });
});

$(document).on('change', '#checkAll', function () {
    const rows = $('.datatable-responsive').find('tbody tr');
    const checked = $(this).prop('checked');
    $.each(rows, function () {
        $($(this).find('td').eq(0)).find('input').prop('checked', checked);
    });
});

$(document).on('change', '.delete_common', function () {
    const selector = $('.datatable-responsive');
    const total = selector.find('tbody tr').length;
    const cntChecked = selector.find('tbody').find('input[type="checkbox"]:checked').length;

    if (total === cntChecked) {
        $('#checkAll').prop('checked', "checked");
    } else {
        $('#checkAll').prop('checked', false);
    }
});

$(document).on('click', '#delete-multiple', function (event) {
    event.preventDefault();
    let form = $(this).closest('form');
    let chkCount = 0;
    let ids = $('.datatable-responsive').find('tbody').find('input[type="checkbox"]:checked').map(function () {
        chkCount ++;
        return this.value;
    }).get().join(',');

    if (chkCount === 0) {
        alert('Please select at least one record to delete');
    } else {
        Swal.fire({
            title : 'Are you sure you want to delete selected ' + chkCount + ' record(s)?',
            text : '',
            type : "warning",
            showCancelButton : true,
            confirmButtonClass : "swal2-confirm btn btn-primary",
            cancelButtonClass : "swal2-cancel btn btn-light",
            confirmButtonText : "Yes",
            cancelButtonText : "Cancel",
        }).then(function (result) {
            if (result.value) {
                form.append("<input type='hidden' value='" + ids + "' name='multi_selection'>");
                form.submit();
            }
        });
    }
});

$(document).on('click', '.exportBtn', function () {
    if ($(this).attr('recordCount') <= 0) {
        alert('No records found to export');
        return false;
    }
});