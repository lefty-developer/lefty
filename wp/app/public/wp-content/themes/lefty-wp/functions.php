<?php
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
?>
