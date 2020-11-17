import os

# in a real project, this script probably wouldn't make so many assumptions
# about the inputs and outputs
NG_DIST_DIR_PATH = '/ng-notebook/angular/dist/'
OUTFILE_PATH = '/hostmount/output/index.html'

# ng build's index.html will be a small, single-line file
with open(os.path.join(NG_DIST_DIR_PATH, 'index.html'), 'r') as infile:
    html = infile.read()

# replace the favicon with inline data
inline_data = "window['breedCounts'] = {" + \
    "appenzeller: 6, briard: 9, cotondetulear: 5, dhole: 1, eskimo: 4};"
html = html.replace(\
    '<link rel="icon" type="image/x-icon" href="favicon.ico">',
    '<script type="text/javascript">' + inline_data + '</script>')

# insert the css
with open(os.path.join(NG_DIST_DIR_PATH, 'styles.bundle.css'), 'r') as infile:
    css = infile.read()
    html = html.replace(\
        '<link href="styles.bundle.css" rel="stylesheet"/>',
        '<style>' + css + '</style>')

# insert the js bundles (there are three)
js_files = ['inline.bundle.js', 'polyfills.bundle.js', 'main.bundle.js']
for js_file in js_files:
    with open(os.path.join(NG_DIST_DIR_PATH, js_file), 'r') as infile:
        js = infile.read()
        html = html.replace(\
            '<script type="text/javascript" src="' + js_file + '"></script>',
            '<script type="text/javascript">' + js + '</script>')

# write the final html
with open(OUTFILE_PATH, 'w') as outfile:
    outfile.write(html)
