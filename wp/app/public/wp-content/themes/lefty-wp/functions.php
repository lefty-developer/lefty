<?php
    /**
     * register API endpoint for contact form plugin
     */
    function get_plugin_output() {
        ob_start();
        if (function_exists("wd_contact_form_maker")) {
            wd_contact_form_maker(1, "embedded"); 
        }
        $output = ob_get_clean();
        return new WP_REST_Response($output, 200);
    }

    add_action('rest_api_init', function () {
        register_rest_route('vord/v1', '/contact-form-maker/', array(
            'methods' => 'GET',
            'callback' => 'get_plugin_output',
        ));
    });

    /**
    * Compress and convert to WebP for uploading images
    */
    function compress_and_convert_images_to_webp($file) {
        // Check if file type is supported
        $supported_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!in_array($file['type'], $supported_types)) {
            return $file;
        }

        // Get the path to the upload directory
        $wp_upload_dir = wp_upload_dir();

        // Set up the file paths
        $old_file_path = $file['file'];
        $file_name = basename($file['file']);
        $webp_file_path = $wp_upload_dir['path'] . '/' . pathinfo($file_name, PATHINFO_FILENAME) . '.webp';

        // Check if file is already a WebP image
        if (pathinfo($old_file_path, PATHINFO_EXTENSION) === 'webp') {
            return $file;
        }

        // Load the image using Imagick
        $image = new Imagick($old_file_path);

        // Compress the image
        $quality = 75; // Adjust this value to control the compression level
        $image->setImageCompressionQuality($quality);
        $image->stripImage(); // Remove all profiles and comments to reduce file size

        // Convert the image to WebP
        $image->setImageFormat('webp');
        $image->setOption('webp:lossless', 'false');
        $image->setOption('webp:method', '6'); // Adjust this value to control the compression level for WebP
        $image->writeImage($webp_file_path);

        // Delete the old image file
        unlink($old_file_path);

        // Return the updated file information
        return [
            'file' => $webp_file_path,
            'url' => $wp_upload_dir['url'] . '/' . basename($webp_file_path),
            'type' => 'image/webp',
        ];
    }

    add_filter('wp_handle_upload', 'compress_and_convert_images_to_webp');
?>
