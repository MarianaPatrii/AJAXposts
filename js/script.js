$(document).ready(function() {
    var list = $('.list_posts');

    function itemPost(post) {
        list.append('<div class="item_post" data-id="'+post.id+'">'+
            '<h2>'+post.title+'</h2>'+
            '<p>'+post.body+'</p>'+
            '<button class="btn_edit">Edit</buuton>'+
            '<button class="btn_del">Delete</buuton>'+
            '</div>'
        )
    }

    function calcPosts() {
        $('.amount_posts').html($('.item_post').length);
    }

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://jsonplaceholder.typicode.com/posts',
        success: function(data) {
            console.log(data);
            data.forEach(function(post) {
                itemPost(post);
                calcPosts();
            });
        }
    });

    $('#send_post').on('submit', function(e) {
        e.preventDefault();

        var title = $('.title_post').val();
        var body = $('.body_post').val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: {
                title: title,
                body: body
            },
            success: function(post) {
                console.log(post);
                list.prepend('<div class="item_post">'+
                '<h2>'+post.title+'</h2>'+
                '<p>'+post.body+'</p>'+
                '</div>'
                );
                calcPosts();
            }
        })
    });

    $(document).on('click', '.btn_del', function() {
        var id = $(this).parent().data('id');
        console.log(id);

        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: 'https://jsonplaceholder.typicode.com/posts/'+id,
            success: function(data) {
                console.log(data, $(this));
                $('[data-id="'+id+'"]').remove();
                calcPosts();
            }
        });
    });

    $(document).on('click', '.btn_edit', function() {
        console.log($(this));
        var id = $(this).parent().data('id');
        var title = $(this).parents('.item_post').find('h2').html();
        var body = $(this).parents('.item_post').find('p').html();

        $('.new_title').val(title);
        $('.new_body').val(body);

        $('#edit_post').on('submit', function(e){
            e.preventDefault();
            $.ajax({
                type: 'PUT',
                dataType: 'json',
                data: {
                    title: $('.new_title').val(),
                    body: $('.new_body').val()
                },
                url: 'https://jsonplaceholder.typicode.com/posts/'+id,
                success: function(data) {
                    console.log(data);
                    $('[data-id="'+id+'"] h2').html(data.title);
                    $('[data-id="'+id+'"] p').html(data.body);

                    $('.new_title').val('');
                    $('.new_body').val('');
                }
            });
        });
    });
});