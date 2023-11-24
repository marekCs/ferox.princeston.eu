<?php

/**
 * @file
 * Lists available colors and color schemes for the theme.
 */

$info = [
  // Available colors and color labels used in theme.
  'fields' => [
    'color' => t('Color Scheme'),
	'text' => t('Text Color'),
	'bg' => t('Body Background'),
	'page_bg' => t('Page Background'),
	'header_bg' => t('Header Background'),
	'header_top_bg' => t('Header Top Background'),
	'menu_bg' => t('Main Menu Background'),
	'menu' => t('Main Menu Color'),
	'menu_hover' => t('Main Menu Hover Color'),
	'page-title_bg' => t('Page Title Background'),
	'footer_bg' => t('Footer Background'),
  ],
  // Pre-defined color schemes.
  'schemes' => [
    'default' => [
      'title' => t('Default'),
      'colors' => [
        'color' => '#2ba9e0',
		'text' => '#555555',
		'bg' => '#f9f9f9',
		'page_bg' => '#ffffff',
		'header_bg' => '#fcfcfc',
	    'header_top_bg' => '#f8f8f8',
		'menu_bg' => '#19212e',
		'menu' => '#fefefe',
		'menu_hover' => '#49c3f9',
		'page-title_bg' => '#f7f7f7',
		'footer_bg' => '#19212c',
      ],
    ],
	'scheme2' => [
      'title' => t('Scheme 2'),
      'colors' => [
        'color' => '#f45000',
		'text' => '#555555',
		'bg' => '#ffffff',
		'page_bg' => '#ffffff',
		'header_bg' => '#ffffff',
	    'header_top_bg' => '#ffffff',
		'menu_bg' => '#19212e',
		'menu' => '#ffffff',
		'menu_hover' => '#f45000',
		'page-title_bg' => '#f7f7f7',
		'footer_bg' => '#19212c',
      ],
    ],
	'scheme3' => [
      'title' => t('Scheme 3'),
      'colors' => [
        'color' => '#b21b98',
		'text' => '#555555',
		'bg' => '#ffffff',
		'page_bg' => '#ffffff',
		'header_bg' => '#ffffff',
	    'header_top_bg' => '#202020',
		'menu_bg' => '#f1f1f1',
		'menu' => '#555555',
		'menu_hover' => '#b21b98',
		'page-title_bg' => '#f7f7f7',
		'footer_bg' => '#19212c',
      ],
    ],
	'scheme4' => [
      'title' => t('Scheme 4'),
      'colors' => [
        'color' => '#0045ff',
		'text' => '#555555',
		'bg' => '#ffffff',
		'page_bg' => '#ffffff',
		'header_bg' => '#ffffff',
	    'header_top_bg' => '#ffffff',
		'menu_bg' => '#19212e',
		'menu' => '#f1f1f1',
		'menu_hover' => '#dddddd',
		'page-title_bg' => '#f7f7f7',
		'footer_bg' => '#19212c',
      ],
    ],
	'scheme5' => [
      'title' => t('Scheme 5'),
      'colors' => [
        'color' => '#ffada5',
		'text' => '#555555',
		'bg' => '#ffffff',
		'page_bg' => '#ffffff',
		'header_bg' => '#ffffff',
	    'header_top_bg' => '#f9f9f9',
		'menu_bg' => '#000000',
		'menu' => '#f9f9f9',
		'menu_hover' => '#ffada5',
		'page-title_bg' => '#f7f7f7',
		'footer_bg' => '#f1f1f1',
      ],
    ],
	'scheme6' => [
      'title' => t('Scheme 6'),
      'colors' => [
        'color' => '#e31c7d',
		'text' => '#555555',
		'bg' => '#ffffff',
		'page_bg' => '#ffffff',
		'header_bg' => '#fcfcfc',
	    'header_top_bg' => '#333333',
		'menu_bg' => '#efd44c',
		'menu' => '#222222',
		'menu_hover' => '#e31c7d',
		'page-title_bg' => '#f7f7f7',
		'footer_bg' => '#ffca09',
      ],
    ],
	'scheme7' => [
      'title' => t('Scheme 7'),
      'colors' => [
        'color' => '#02b39a',
		'text' => '#555555',
		'bg' => '#f9f9f9',
		'page_bg' => '#ffffff',
		'header_bg' => '#fcfcfc',
	    'header_top_bg' => '#f8f8f8',
		'menu_bg' => '#19212e',
		'menu' => '#fefefe',
		'menu_hover' => '#00e4c3',
		'page-title_bg' => '#f7f7f7',
		'footer_bg' => '#19212e',
      ],
    ],
	'scheme8' => [
      'title' => t('Scheme 8'),
      'colors' => [
        'color' => '#e0d02b',
		'text' => '#555555',
		'bg' => '#f0efee',
		'page_bg' => '#ffffff',
		'header_bg' => '#ffffff',
	    'header_top_bg' => '#ffffff',
		'menu_bg' => '#ffffff',
		'menu' => '#333333',
		'menu_hover' => '#e0d02b',
		'page-title_bg' => '#f7f7f7',
		'footer_bg' => '#ffffff',
      ],
    ],
	'scheme9' => [
      'title' => t('Scheme 9 (Dark)'),
      'colors' => [
        'color' => '#ffcb15',
		'text' => '#f9f9f9',
		'bg' => '#000000',
		'page_bg' => '#0a0b0d',
		'header_bg' => '#131f33',
	    'header_top_bg' => '#15233b',
		'menu_bg' => '#fd6c37',
		'menu' => '#fefefe',
		'menu_hover' => '#fff529',
		'page-title_bg' => '#170606',
		'footer_bg' => '#170606',
      ],
    ],
  ],

  // CSS files (excluding @import) to rewrite with new color scheme.
  'css' => [
    'assets/css/colors.css',
  ],

  // Files to copy.
  'copy' => [
    'logo.svg',
  ],

  // Gradient definitions.
  'gradients' => [
    [
      // (x, y, width, height).
      'dimension' => [0, 0, 0, 0],
      // Direction of gradient ('vertical' or 'horizontal').
      'direction' => 'vertical',
      // Keys of colors to use for the gradient.
      'colors' => ['color', 'text'],
    ],
  ],

  // Preview files.
  'preview_library' => 'martis/color.preview',
  'preview_html' => 'color/preview.html',

  // Attachments.
  '#attached' => [
    'drupalSettings' => [
      'color' => [
        // Put the logo path into JavaScript for the live preview.
        'logo' => theme_get_setting('logo.url', 'martis'),
      ],
    ],
  ],
];
