<?php
add_action( 'admin_head-edit.php', 'wpse_59871_script_enqueuer' );

// remove Password input field from Pages' Quick Edit panel 
function wpse_59871_script_enqueuer() 
{    

      //  /wp-admin/edit.php?post_type=post
      //  /wp-admin/edit.php?post_type=page
      //  /wp-admin/edit.php?post_type=cpt  == page in this example

    global $current_screen;
    if( 'edit-page' != $current_screen->id )
        return;
    ?>
    <script type="text/javascript">         
        jQuery(document).ready( function($) {
          $( "input[class*='password']" ).each(function (i) {
              $(this).parent().parent().next().remove();
              $(this).parent().parent().remove();
          })
        });    
    </script>
    <?php
}
?>