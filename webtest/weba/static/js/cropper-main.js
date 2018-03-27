(function ($) {

    var $imageView;
    function crop() {
        this.myImage = null;
        this.path_upload = '/upload/';
    }

    crop.prototype.ready = function () {
        $('#imageView').hide();
        $imageView = $('#imageView');
        $imageView.cropper({
            viewMode: 1,
            preview: $('#avatar-preview'),
            crop: function(event) {
                console.log(event)
                if(event.width<350 || event.height<350){
                    $('#btnCrop').attr('disabled',true);
                    $('#alertError').fadeIn();
                }
                    
                else{
                    $('#btnCrop').removeAttr('disabled');
                    $('#alertError').fadeOut();
                }
                
                $('#dataWidth').val(event.width.toFixed(2));
                $('#dataHeight').val(event.height.toFixed(2));
              }
        });
    };
    crop.prototype.upload = function (self) {

        this.myImage = self;
        $('#select-upload').show()
        $('#corpDisplay').hide()
        $('#uploadModal').modal('show');
        var s = this;
        $('#avatarInput').off('change');
        $('#avatarInput').on('change', function () {
            var files = $('#avatarInput').prop('files');
            if (files.length > 0) {
                file = files[0];
                s.url = URL.createObjectURL(file);
                s.startCropper();
                $('#select-upload').hide()
                $('#corpDisplay').show()
            }
        });
        $('#avatar-btns').off('click', 'button');
        $('#avatar-btns').on('click', 'button', function () {
            data = $(this).data();
            $imageView.cropper(data.method, data.option);
        });
        $('#btnCrop').off('click');
        $('#btnCrop').on('click', function () {
            
            var croppedCanvas = $imageView.cropper('getCroppedCanvas');
            roundedCanvas = getRoundedCanvas(croppedCanvas);
            if (roundedCanvas)
                s.startUpload(croppedCanvas.toDataURL());
        });
        $('#btnReset').off('click');
        $('#btnReset').on('click', function () {
            $('#uploadModal').modal('hide');
        });
        $('#uploadModal').off('hidden.bs.modal');
        $('#uploadModal').on('hidden.bs.modal', function (e) {
            // do something...
            $imageView.cropper('destroy');
            $('#imageView').attr('src', '');
        });
    };
    crop.prototype.startCropper = function () {
        $('#imageView').cropper('replace', this.url);
    };
    crop.prototype.startUpload = function (url) {

        var text_btn = $('#btnCrop').html();
                var text_btn_l = $('#btnCrop').data('toggle');
                $('#btnCrop').html(text_btn_l);
        var self  = this
        $.ajax({
            url: '/upload/',
            type: 'POST',
            dataType: 'json',
            data: {
                file: url
            },
            beforeSend: function (xhr, settings) {
                var csrftoken = $.cookie('csrftoken');
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            error: function(){
                $('#btnCrop').html(text_btn);
            },
            success: function (res) {
                $('#btnCrop').html(text_btn);
                $('#uploadModal').modal('hide');
                $(".avatar-form")[0].reset();
                $imageView.cropper('destroy');
                $('#imageView').attr('src', '');
                self.ready();
                self.myImage({
                    url: res.url,
                    alt: $('#alt').val()
                })


            }
        })

    };
    function getRoundedCanvas(sourceCanvas) {
        if (sourceCanvas == null)
            return false;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
        context.strokeStyle = 'rgba(0,0,0,0)';
        context.stroke();
        context.clip();
        context.drawImage(sourceCanvas, 0, 0, width, height);
        return canvas;
    }

    $.crop = new crop();
})(jQuery);
