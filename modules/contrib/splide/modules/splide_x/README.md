
# INTRODUCTION

Provides samples for Optionsets, Image styles, Splide Views blocks and a few
supported alters.

Please do not use this module for your works, instead clone anything, make it
yours, and use it to learn how to make the most out of Splide module.
This module will be updated at times to reflect the best shot Splide can give,
so it may not keep your particular use.

## REQUIREMENTS
* [Splide](https://www.drupal.org/project/splide)
* field_image and field_images, see INSTALLATION.


## INSTALLATION

Watch out the sequence, they are important:

1. These fields must exist **before installing Splide Example**:
   + **Image** (field_image as machine name, single value)
   + **Images** (field_images as machine name, multi-value/ unlimited)
     The **field_image** is already created at Article type at Drupal Standard
     install. Just add another named **Images** (field_images).
     The **field_** prefix is the machine name.
     **Note!** Drupal will auto prefix the field names with **field_**, so no
     need to manually type **Field Images**, just type **Images**.
2. Create a new content type, **Slideshow** (or the existing like Article, etc.)
   and add 2 image fields with these machine names.

3. Then **install the Splide X module**.

Failing to follow the above sequential steps may fail installing this module.
These fields were left out for your own exercise, so you can move forward to
more complex slideshow needs at your own steps, such with Media, Paragraphs,
and other entities. Giving you all the fish is fine, too, but it would spoil.


## DETAILED INSTALLATION
Assumed you already installed Image and Devel generate modules.
If not, please install and enable them at `/admin/modules`.

Do not install Splide X, yet!


### Before installing Splide X:

1. `/admin/structure/types/add`

   Create a dummy content type, say **Slideshow**, or use an existing one.

   Hit **Save and add fields**, landed to #2 page.

2. `/admin/structure/types/manage/slideshow/fields`

   Add two field types of image named exactly as below for now:
   + **Image** (field_image, single value),

     as available on Article content type of Standard install.
   + **Images** (field_images, multiple values),

     must be created before seeing this example useful, be sure the latest node
     containing field_images have at least 3 images.

     Later can be Media file, Field collection, etc. You can separate
     `field_image` and `field_images` at any content type.

     No need to place them at one content type.

     See `/admin/reports/fields` for the list of your fields.

3. `/admin/config/development/generate/content`

   Generate **Slideshow** contents.


### After the above steps, proceed:

1. Install Splide X and their dependencies.

2. `/admin/structure/block`

   Place the Splide X Views blocks, prefixed with **Splide X:**, at any wide
   region at a particular testing page, and see your splides there.


Enjoy!


## AFTER SUCCESSFUL INSTALLATION
The **field_image** or **field_images** are required for successful install.
Once successful, you can use any field name, and apply the Splide formatter to
any supported field types: Image, Media, Paragraphs, etc.


## TROUBLESHOOTING
1. Skins are permanently cached. If you don't see newly added skins, either
   yours, or this module's, be sure to clear cache.
2. The provided samples contain Body text as captions. If your Body text has
   HTML, it may be chopped incorrectly, causing broken layouts. Adjust the Views
   settings to support HTML, or remove the Body text if unsure.


## LEARN MORE
To learn more about the splides, go to:

1. `/admin/structure/views`

   Find **Splide X**, and hit **Edit** or **Clone**, and make it yours.

   Only **Block: grid** is expecting **Image** from **Article**.

   The rest **Images**.

   Adjust and change anything.

2. `/admin/structure/types/manage/slideshow/display`

   Find **Images** and add a formatter **Splide Slider** under **Format**.

   Play with anything and see the changes at its full page.

Be sure to disable **Cache** during work, otherwise no changes are visible.
Use the pattern with different field names and paths to any fieldable entity
later for more complex needs.


## MORE DETAILED INSTALLATION
The Splide X is just providing basic samples of the Splide usage:

* Several optionsets prefixed with **X** available at
  `admin/config/media/splide`.

  You can clone what is needed, and make them disabled, or uninstalled later.

* Several view blocks available at `/admin/structure/view`.

  You can clone it to make it yours, and adjust anything accordingly.

* Several splide image styles at `/admin/config/media/image-styles`.

  You can re-create your own styles, and adjust the sample Views accordingly
  after cloning them.


## MANAGE FIELDS
To create the new field **Images**:

  1. `/admin/structure/types`

     Choose any **Manage fields** of your expected content type, for easy test
     I recommend Article where you have already a single Image. Basic page is
     fine too if you have large carousels at Basic pages. Or do both.
  2. Add new field: Images (without **field_** as Drupal prefixes it
     automatically).
  3. Select a field type: Image.
  4. Save, and follow the next screen.
     Be sure to choose **Unlimited** for the **Number of values**.

You can also do the similar steps with any fieldable entity:

  * `/admin/structure/field-collections`
  * `/admin/structure/paragraphs`
  * `/admin/config/people/accounts/fields`
  * etc.

All requirements may be adjusted to your available instances, see below.

To have various splide displays, recommended to put both **field_image** and
**field_images** at the same content type. This allows building nested splide or
asNavFor at its very basic usage.

You can later use the pattern to build more complex nested splide with
video/audio via Media file fields when using with Field collection module.

Shortly, you have to add, or adjust the fields manually if you need to learn
from this example.


## VIEWS COLLECTION PAGE
Adjust the example references to images accordingly at the Views edit page.

 1. `/admin/structure/views`
 2. Edit the Views Splide X before usage, adjust possible broken settings:
    `/admin/structure/views/view/splide_x/edit`
    The first block depends on the latest node expected to have
    **field_images**:

    `/admin/structure/views/view/splide_x/edit/block`


## GRID
Splide grid set to have at least 10 visible images per slide to a total of 40.
Be sure to have at least 12 visible images/ nodes with image, or so to see the
grid work which results in at least 2 sets of grids.

Change the numbers later once all is set, and get a grasp of it.

To create Splide grid or multiple rows carousel, there are 3 options:

1. One row grid managed by library:

   `/admin/config/media/splide`

   Edit current optionset, and set
   perPage > 1

2. Multiple rows grid managed by library:

   `/admin/config/media/splide`

   @todo: Must use a separated plugin, currently not included, 2021/5.

3. Multiple rows grid managed by Module:

   `/admin/structure/views/view/splide_x/edit/block_grid`

   Be sure to install the Splide X sub-module first.
   Requires skin **Grid**, and set
   perPage, perMove = 1.

The first 2 are supported by core library using pure JS approach.
The last is the Module feature using pure CSS Foundation b-grid. The key is:
the total amount of Views results must be bigger than Visible slides, otherwise
broken Grid, see skin Grid above for more details.


# <a name="tips"> </a>TIPS
* Do not override samples. Clone them instead so you can update later just by
  clearing cache. Once cloned, you can disable the samples at Views UI page to
  declutter UI. Yours will be intact, the updates will be respected.
  Cloning ensure samples can be reverted like breaking changes from v3 to v4.
  Yours will not be reverted to factory values except for few changed options.

* Do not re-create from scratch. Clone instead. Too many steps and options are
  not documented. Cloning saves many steps. Even if you are very experienced
  with Views UI.


## MAINTAINERS
* [Gaus Surahman](https://drupal.org/user/159062)
* CHANGELOG.txt for helpful souls with their patches, suggestions and reports.


## READ MORE
See splide_x.module for more explorations on available hooks.

And don't forget to uninstall this module at production. This only serves as
examples, no real usage, nor intended for production. But it is safe to keep it
at production if you forget to uninstall though.

More info relevant to each option is available at their form display by hovering
over them, and click a dark question mark.

See the Splide docs at:

* [Splide website](https://splidejs.com/)
* [Splide at Github](https://github.com/Splidejs/splide)
