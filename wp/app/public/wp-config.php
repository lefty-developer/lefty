<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'O/zwrorHW+L+oEx/UPmsO0sIBhwX7cmRS704cA78W22luLy8Nd7QggEPwubkdR6kkMCF+dPm1tNHHiOjITj9wg==');
define('SECURE_AUTH_KEY',  '/WueXzAqxGIL0gzDVRADi5C6Qno6P5ltlLT/+hlaqBkfNuvYZvJ/bC1NXVvnJZFy/JY41z2XA+4B8HK9lY8q7A==');
define('LOGGED_IN_KEY',    'p9DFRi9txBt0dBlVEBhEATPLaaWp2vJrNcSCxc1lqoyhQryr/1oKZmyfAdNHNyPlGr8cWIgGgPviZy3l6Iu2aQ==');
define('NONCE_KEY',        'tclchTpxcpVR7k7lCPmTwqUjEAqPSC1Yzz9BhXZgsrIQG/+mKj4MRtPLOqGszv3TbmAitaRGL2fyQs2IRs9G0A==');
define('AUTH_SALT',        'HLdG+91543rTkD3bIGl+OdGrwrnjj4PQtC7TO9AV2A4LIsi3qbFaXgiNeuwykPP8MqNKmHxc3yQ1y7WO8qiOfQ==');
define('SECURE_AUTH_SALT', '0PA1HOjfXM/bpH2moa4O6vv81AaTRpoJpiWD53Kp+z9qlePUIWH01/txXTQ9qpgow/vXvkUcOxsTr2w3bjMf1Q==');
define('LOGGED_IN_SALT',   'KvBaLrdbDtZAs+Xa3R47r71Rha/mRY7/QE6Pvv3C9fiaS3hiXgslstmynTW/byrm/6btYSvGI9S/WZgChFGSIQ==');
define('NONCE_SALT',       's0/xNU4sBVFtNNBjCCJTTK+l0XC93+04JqC3q5k+iJKE/FRFRBoWb6qUlu8rOUog8Vjqm3T1XZXGPG77yHlQNQ==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
