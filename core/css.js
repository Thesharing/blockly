/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Inject Blockly's CSS synchronously.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * @name Blockly.Css
 * @namespace
 */
goog.provide('Blockly.Css');


/**
 * List of cursors.
 * @enum {string}
 */
Blockly.Css.Cursor = {
  OPEN: 'handopen',
  CLOSED: 'handclosed',
  DELETE: 'handdelete'
};

/**
 * Current cursor (cached value).
 * @type {string}
 * @private
 */
Blockly.Css.currentCursor_ = '';

/**
 * Large stylesheet added by Blockly.Css.inject.
 * @type {Element}
 * @private
 */
Blockly.Css.styleSheet_ = null;

/**
 * Path to media directory, with any trailing slash removed.
 * @type {string}
 * @private
 */
Blockly.Css.mediaPath_ = '';

/**
 * Inject the CSS into the DOM.  This is preferable over using a regular CSS
 * file since:
 * a) It loads synchronously and doesn't force a redraw later.
 * b) It speeds up loading by not blocking on a separate HTTP transfer.
 * c) The CSS content may be made dynamic depending on init options.
 * @param {boolean} hasCss If false, don't inject CSS
 *     (providing CSS becomes the document's responsibility).
 * @param {string} pathToMedia Path from page to the Blockly media directory.
 */
Blockly.Css.inject = function(hasCss, pathToMedia) {
  // Only inject the CSS once.
  if (Blockly.Css.styleSheet_) {
    return;
  }
  // Placeholder for cursor rule.  Must be first rule (index 0).
  var text = '.blocklyDraggable {}\n';
  if (hasCss) {
    text += Blockly.Css.CONTENT.join('\n');
    if (Blockly.FieldDate) {
      text += Blockly.FieldDate.CSS.join('\n');
    }
  }
  // Strip off any trailing slash (either Unix or Windows).
  Blockly.Css.mediaPath_ = pathToMedia.replace(/[\\\/]$/, '');
  text = text.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
  // Inject CSS tag at start of head.
  var cssNode = document.createElement('style');
  document.head.insertBefore(cssNode, document.head.firstChild);

  var cssTextNode = document.createTextNode(text);
  cssNode.appendChild(cssTextNode);
  Blockly.Css.styleSheet_ = cssNode.sheet;
};

/**
 * Set the cursor to be displayed when over something draggable.
 * See See https://github.com/google/blockly/issues/981 for context.
 * @param {Blockly.Css.Cursor} cursor Enum.
 * @deprecated April 2017.
 */
Blockly.Css.setCursor = function(cursor) {
  console.warn('Deprecated call to Blockly.Css.setCursor.' +
    'See https://github.com/google/blockly/issues/981 for context');
};

/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Css.CONTENT = [
    '.blocklyDraggable {}',
    '.blocklySvg {',
    'background-color: #fff;',
    'outline: none;',
    'overflow: hidden;',
    'position: absolute;',
    'display: block;',
    '}',

    '.blocklyWidgetDiv {',
    'display: none;',
    'position: absolute;',
    'z-index: 99999;',
    '}',

    '.injectionDiv {',
    'height: 100%;',
    'position: relative;',
    'overflow: hidden;',
    'touch-action: none',
    '}',

    '.blocklyNonSelectable {',
    'user-select: none;',
    '-moz-user-select: none;',
    '-webkit-user-select: none;',
    '-ms-user-select: none;',
    '}',

    '.blocklyWsDragSurface {',
    'display: none;',
    'position: absolute;',
    'overflow: visible;',
    'top: 0;',
    'left: 0;',
    '}',

    '.blocklyBlockDragSurface {',
    'display: none;',
    'position: absolute;',
    'top: 0;',
    'left: 0;',
    'right: 0;',
    'bottom: 0;',
    'overflow: visible !important;',
    'z-index: 50;',
    '}',

    '.blocklyTooltipDiv {',
    'background-color: #333;',
    'border-radius: 2px;',
    'color: #fff;',
    'display: none;',
    'font-family: sans-serif;',
    'font-size: 9pt;',
    'opacity: 0.9;',
    'padding: 5px;',
    'position: absolute;',
    'z-index: 1000;',
    '}',

    '.blocklyResizeSE {',
    'cursor: se-resize;',
    'fill: #aaa;',
    '}',

    '.blocklyResizeSW {',
    'cursor: sw-resize;',
    'fill: #aaa;',
    '}',

    '.blocklyResizeLine {',
    'stroke: #888;',
    'stroke-width: 1;',
    '}',

    '.blocklyHighlightedConnectionPath {',
    'fill: #FFDC00;',
    'stroke: #FFDC00;',
    'stroke-width: 4px;',
    '}',

    '.blocklyPathLight {',
    'fill: none;',
    'stroke-linecap: round;',
    'stroke-width: 1;',
    '}',

    '.blocklySelected>.blocklyPath {',
    'stroke: #FFDC00;',
    'stroke-width: 3px;',
    '}',

    '.blocklySelected>.blocklyPathLight {',
    'display: none;',
    '}',

    '.blocklyDraggable {',
    'cursor: url(\"third-party/blockly/media/handopen.cur\"), auto;',
    'cursor: grab;',
    'cursor: -webkit-grab;',
    'cursor: -moz-grab;',
    '}',

    '.blocklyDragging {',
    'cursor: url(\"third-party/blockly/media/handclosed.cur\"), auto;',
    'cursor: grabbing;',
    'cursor: -webkit-grabbing;',
    'cursor: -moz-grabbing;',
    '}',

    '.blocklyDraggable:active {',
    'cursor: url(\"third-party/blockly/media/handclosed.cur\"), auto;',
    'cursor: grabbing;',
    'cursor: -webkit-grabbing;',
    'cursor: -moz-grabbing;',
    '}',

    '.blocklyBlockDragSurface .blocklyDraggable {',
    'cursor: url(\"third-party/blockly/media/handclosed.cur\"), auto;',
    'cursor: grabbing;',
    'cursor: -webkit-grabbing;',
    'cursor: -moz-grabbing;',
    '}',

    '.blocklyDragging.blocklyDraggingDelete {',
    'cursor: url(\"third-party/blockly/media/handdelete.cur\"), auto;',
    '}',

    '.blocklyToolboxDelete {',
    'cursor: url(\"third-party/blockly/media/handdelete.cur\"), auto;',
    '}',

    '.blocklyDragging>.blocklyPath,',
    '.blocklyDragging>.blocklyPathLight {',
    'fill-opacity: .8;',
    'stroke-opacity: .8;',
    '}',

    '.blocklyDragging>.blocklyPathDark {',
    'display: none;',
    '}',

    '.blocklyDisabled>.blocklyPath {',
    'fill-opacity: .3;',
    'stroke-opacity: .3;',
    '}',

    '.blocklyDisabled>.blocklyPathLight,',
    '.blocklyDisabled>.blocklyPathDark {',
    'display: none;',
    '}',

    '.blocklyText {',
    'cursor: default;',
    'fill: #fff;',
    'font-family: sans-serif;',
    'font-size: 11pt;',
    '}',

    '.blocklyText.brick_label {',
    'fill: #000;',
    'font-weight: bold;',
    'font-size: 14pt;',
    '}',

    '.blocklyNonEditableText>text {',
    'pointer-events: none;',
    '}',

    '.blocklyNonEditableText>rect,',
    '.blocklyEditableText>rect {',
    'fill: #fff;',
    'fill-opacity: .6;',
    '}',

    '.blocklyNonEditableText>text,',
    '.blocklyEditableText>text {',
    'fill: #000;',
    '}',

    '.blocklyEditableText:hover>rect {',
    'stroke: #fff;',
    'stroke-width: 2;',
    '}',

    '.blocklyBubbleText {',
    'fill: #000;',
    '}',

    '.blocklyFlyout {',
    'position: absolute;',
    'z-index: 20;',
    '}',

    '.blocklyFlyoutButton {',
    'fill: #888;',
    'cursor: default;',
    '}',

    '.blocklyFlyoutButtonShadow {',
    'fill: #666;',
    '}',

    '.blocklyFlyoutButton:hover {',
    'fill: #aaa;',
    '}',

    '.blocklyFlyoutLabel {',
    'cursor: default;',
    '}',

    '.blocklyFlyoutLabelBackground {',
    'opacity: 0;',
    '}',

    '.blocklyFlyoutLabelText {',
    'fill: #000;',
    '}',

    '.blocklySvg text, .blocklyBlockDragSurface text {',
    'user-select: none;',
    '-moz-user-select: none;',
    '-webkit-user-select: none;',
    'cursor: inherit;',
    '}',

    '.blocklyHidden {',
    'display: none;',
    '}',

    '.blocklyFieldDropdown:not(.blocklyHidden) {',
    'display: block;',
    '}',

    '.blocklyIconGroup {',
    'cursor: default;',
    '}',

    '.blocklyIconGroup:not(:hover),',
    '.blocklyIconGroupReadonly {',
    'opacity: .6;',
    '}',

    '.blocklyIconShape {',
    'fill: #00f;',
    'stroke: #fff;',
    'stroke-width: 1px;',
    '}',

    '.blocklyIconSymbol {',
    'fill: #fff;',
    '}',

    '.blocklyIconMarkWarningError {',
    'fill: #000;',
    '}',

    'g .blocklyIconGroup:hover path[class=\"blocklyIconMarkWarningError\"] {',
    'fill: #fff;',
    'cursor: pointer',
    '}',

    'g .blocklyIconGroup:hover circle[class=\"blocklyIconMarkWarningError\"] {',
    'fill: #fff;',
    'cursor: pointer',
    '}',

    '.blocklyIconMarkWarningError:hover {',
    'fill: #fff;',
    '}',

    '.blocklyMinimalBody {',
    'margin: 0;',
    'padding: 0;',
    'transform: none;',
    '}',

    '.blocklyCommentTextarea {',
    'background-color: #fff;',
    'border: 0;',
    'margin: 0;',
    'padding: 2px;',
    'resize: none;',
    'outline: 0 none',
    '}',

    '.blocklyHtmlInput {',
    'border: none;',
    'border-radius: 4px;',
    'font-family: sans-serif;',
    'height: 100%;',
    'margin: 0;',
    'outline: none;',
    'padding: 0 1px;',
    'width: 100%;',
    'line-height: normal;',
    '}',

    '.blocklyMainBackground {',
    'stroke-width: 1;',
    'stroke: #c6c6c6;',
    '}',

    '.blocklyMutatorBackground {',
    'fill: #fff;',
    'stroke: #ddd;',
    'stroke-width: 1;',
    '}',

    '.blocklyFlyoutBackground {',
    'fill-opacity: 0.8;',
    '}',

    '.blocklyTransparentBackground {',
    'opacity: 0;',
    '}',

    '.blocklyMainWorkspaceScrollbar {',
    'z-index: 20;',
    '}',

    '.blocklyFlyoutScrollbar {',
    'z-index: 30;',
    '}',

    '.blocklyCon {',
    'fill: #eee;',
    'fill-opacity: 1;',
    '}',

    '.blocklyConSelected {',
    'fill-opacity: .65;',
    '}',

    '.blocklyScrollbarHorizontal, .blocklyScrollbarVertical {',
    'position: absolute;',
    'outline: none;',
    '}',

    '.blocklyScrollbarBackground {',
    'opacity: 0;',
    'display: none;',
    '}',

    '.blocklyScrollbarHandle {',
    'fill: #ccc;',
    '}',

    '.blocklyScrollbarKnob {',
    'display: none;',
    '}',

    '.blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,',
    '.blocklyScrollbarKnob:hover,',
    '.blocklyScrollbarBackground:hover + .blocklyScrollbarHandle,',
    '.blocklyScrollbarHandle:hover {',
    'fill: #bbb;',
    '}',

    '.blocklyZoom>image {',
    'opacity: .4;',
    '}',

    '.blocklyZoom>image:hover {',
    'opacity: .6;',
    '}',

    '.blocklyZoom>image:active {',
    'opacity: .8;',
    '}',

    'rect[class=\"blocklyButtonBack\"] {',
    'fill: #fff;',
    '}',

    'g .robButtonHidden {',
    'display: none',
    '}',

    'g .robButton:hover rect[class=\"blocklyButtonBack\"] {',
    'fill: #BACC1E;',
    'cursor: pointer',
    '}',

    'g .robButton:hover path[class=\"blocklyButtonPath\"] {',
    'cursor: pointer',
    '}',

    'g .robButton.disabled {',
    'pointer-events: none;',
    '}',

    'g .robButton.disabled path[class=\"blocklyButtonPath\"] {',
    'fill: #bbb',
    '}',

    '.blocklyFlyout .blocklyScrollbarKnob {',
    'fill: #bbb;',
    '}',

    '.blocklyFlyout .blocklyScrollbarHandle {',
    'fill: #bbb;',
    '}',

    '.blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,',
    '.blocklyFlyout .blocklyScrollbarKnob:hover {',
    'fill: #aaa;',
    '}',

    '.blocklyInvalidInput {',
    'background: #faa;',
    '}',

    '.blocklyAngleCircle {',
    'stroke: #444;',
    'stroke-width: 1;',
    'fill: #ddd;',
    'fill-opacity: .8;',
    '}',

    '.blocklyAngleMarks {',
    'stroke: #444;',
    'stroke-width: 1;',
    '}',

    '.blocklyAngleGauge {',
    'fill: #f88;',
    'fill-opacity: .8;',
    '}',

    '.blocklyAngleLine {',
    'stroke: #f00;',
    'stroke-width: 2;',
    'stroke-linecap: round;',
    '}',

    '.blocklyContextMenu {',
    'border-radius: 4px;',
    '}',

    '.blocklyDropdownMenu {',
    'padding: 0 !important;',
    '}',

    '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
    '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
    'background: url(third-party/blockly/media/sprites.png) no-repeat -48px -16px !important;',
    '}',

    '.blocklyToolboxDiv {',
    'background-color: #eee;',
    'overflow-x: visible;',
    'overflow-y: auto;',
    'position: absolute;',
    'z-index: 70;',
    '}',

    '.blocklyTreeRoot {',
    'padding: 10px 0;',
    '}',

    '.blocklyTreeRoot:focus {',
    'outline: none;',
    '}',

    '.blocklyTreeRow {',
    'height: 40px;',
    'line-height: 0;',
    'margin-bottom: 6px;',
    '}',

    '.blocklyToolboxDiv.small .blocklyTreeRow {',
    'width: 55px;',
    '}',

    '.blocklyToolboxDiv.scroll.small .blocklyTreeRow {',
    'width: 70px;',
    '}',

    '.blocklyHorizontalTree {',
    'float: left;',
    'margin: 1px 5px 8px 0;',
    '}',

    '.blocklyHorizontalTreeRtl {',
    'float: right;',
    'margin: 1px 0 8px 5px;',
    '}',

    '.blocklyTreeRow:hover {',
    'cursor: pointer',
    '}',

    '.blocklyToolboxDiv[dir=\"RTL\"] .blocklyTreeRow {',
    'margin-left: 8px;',
    '}',

    '.blocklyTreeRow:not(.blocklyTreeSelected):hover {',
    'background-color: #e4e4e4;',
    'cursor: pointer',
    '}',

    '.toolboxIcon {',
    'display: inline-block;',
    'position: relative;',
    'top: 20px;',
    'left: 8px;',
    'font-size: 24px;',
    'color: #fff;',
    'float: left;',
    'height: 0;',
    'visibility: hidden',
    '}',

    '.blocklyToolboxDiv.small .toolboxIcon {',
    'visibility: visible',
    '}',

    '.blocklyTreeSeparator {',
    'border-bottom: solid #e5e5e5 1px;',
    'height: 0;',
    'margin: 5px 0;',
    '}',

    '.blocklyTreeSeparatorHorizontal {',
    'border-right: solid #e5e5e5 1px;',
    'width: 0;',
    'padding: 5px 0;',
    'margin: 0 5px;',
    '}',

    '.blocklyTreeIcon {',
    'background-image: url(third-party/blockly/media/sprites.png);',
    'height: 16px;',
    'vertical-align: middle;',
    'width: 16px;',
    '}',

    '.toolboxIcon.typcn:before {',
    'line-height:0',
    '}',

    '.blocklyTreeIconClosedLtr {',
    'background-position: -32px -1px;',
    '}',

    '.blocklyTreeIconClosedRtl {',
    'background-position: 0px -1px;',
    '}',

    '.blocklyTreeIconOpen {',
    'background-position: -16px -1px;',
    '}',

    '.blocklyTreeSelected>.blocklyTreeIconClosedLtr {',
    'background-position: -32px -17px;',
    '}',

    '.blocklyTreeSelected>.blocklyTreeIconClosedRtl {',
    'background-position: 0px -17px;',
    '}',

    '.blocklyTreeSelected>.blocklyTreeIconOpen {',
    'background-position: -16px -17px;',
    '}',

    '.blocklyTreeIconNone,',
    '.blocklyTreeSelected>.blocklyTreeIconNone {',
    'background-position: -48px -1px;',
    '}',

    '.blocklyTreeLabel {',
    'font-family: sans-serif;',
    'position: relative;',
    'top: 20px;',
    'float: left;',
    'font-size: 16pt;',
    'color: #fff;',
    'padding: 0 0 0 3px;',
    '}',

    '.blocklyToolboxDelete .blocklyTreeLabel {',
    'cursor: url(\"third-party/blockly/media/handdelete.cur\"), auto;',
    '}',

    '.blocklyTreeSub {',
    'font-size: 10pt;',
    '}',

    '.blocklyToolboxDiv.small  .blocklyTreeLabel {',
    'visibility: hidden',
    '}',

    '.blocklyTreeRow::after {',
    'background-image: url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><g><path class=\"blocklyConSelected\" fill=\"%23eee\" d=\"M1,41 v-11 l7.8,0.5 l2.5-5.5 c3-10.7,0.3-16.3-10.3-15.7 v-10 h30v41h-30z\"></path><path class=\"blocklyToolboxBackground\" stroke=\"%23eee\" stroke-width=\"2\" fill=\"none\" d=\"M1,40 v-10 l7.8,0.5 l2.5-5.5 c3-10.7,0.3-16.3-10.3-15.7 v-10\"></path></g></svg>\');',
    'content: \"\";',
    'width: 15px;',
    'height: 40px;',
    'float: right;',
    'display: inline-block;',
    '}',

    '.blocklyTreeRow.selected::after {',
    'background-image: url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><g><path class=\"blocklyConSelected\" fill-opacity=\"0.7\" fill=\"%23eee\" d=\"M1,41 v-11 l7.8,0.5 l2.5-5.5 c3-10.7,0.3-16.3-10.3-15.7 v-10 h30v41h-30z\"></path><path class=\"blocklyToolboxBackground\" stroke=\"%23eee\" stroke-width=\"2\" fill=\"none\" d=\"M1,40 v-10 l7.8,0.5 l2.5-5.5 c3-10.7,0.3-16.3-10.3-15.7 v-10\"></path></g></svg>\');',
    '}',

    '.blocklyToolboxDiv[dir=\"RTL\"] .blocklyTreeRow .blocklyTreeLabel {',
    'float: right;',
    'padding: 0 3px 0 6px;',
    '}',

    '.blocklyToolboxDiv.scroll .blocklyTreeRow::after {',
    'width: 15px;',
    '}',

    '.blocklyToolboxDiv.scroll.small .blocklyTreeRow::after {',
    'width: 30px;',
    '}',

    '.blocklyToolboxDiv.scroll.small .blocklyTreeLabel {',
    'padding: 0 17px 0 3px;',
    '}',

    '.blocklyTreeSelected .blocklyTreeLabel {',
    'color: #fff;',
    '}',

    '.blocklyWidgetDiv .goog-palette {',
    'outline: none;',
    'cursor: default;',
    '}',

    '.blocklyWidgetDiv .goog-palette-table {',
    'border: 1px solid #666;',
    'border-collapse: collapse;',
    '}',

    '.blocklyWidgetDiv .goog-palette-cell {',
    'height: 13px;',
    'width: 15px;',
    'margin: 0;',
    'border: 0;',
    'text-align: center;',
    'vertical-align: middle;',
    'border-right: 1px solid #666;',
    'font-size: 1px;',
    '}',

    '.blocklyWidgetDiv .goog-palette-colorswatch {',
    'position: relative;',
    'height: 13px;',
    'width: 15px;',
    'border: 1px solid #666;',
    '}',

    '.blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {',
    'border: 1px solid #FFF;',
    '}',

    '.blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {',
    'border: 1px solid #000;',
    'color: #fff;',
    '}',

    '.blocklyWidgetDiv .goog-menu {',
    'background: #fff;',
    'border-color: #ccc #666 #666 #ccc;',
    'border-style: solid;',
    'border-width: 1px;',
    'cursor: default;',
    'font: normal 13px Arial, sans-serif;',
    'margin: 0;',
    'outline: none;',
    'padding: 4px 0;',
    'position: absolute;',
    'overflow-y: auto;',
    'overflow-x: hidden;',
    'max-height: 100%;',
    'z-index: 20000;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem {',
    'color: #000;',
    'font: normal 13px Arial, sans-serif;',
    'list-style: none;',
    'margin: 0;',
    'padding: 4px 7em 4px 28px;',
    'white-space: nowrap;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem.dropdownImage{',
    'padding: 4px 17px 4px 28px;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {',
    'padding-left: 7em;',
    'padding-right: 28px;',
    '}',

    '.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,',
    '.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {',
    'padding-left: 12px;',
    '}',

    '.blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {',
    'padding-right: 20px;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-content {',
    'color: #000;',
    'font: normal 13px Arial, sans-serif;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,',
    '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {',
    'color: #ccc !important;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {',
    'opacity: 0.3;',
    '-moz-opacity: 0.3;',
    'filter: alpha(opacity=30);',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-highlight,',
    '.blocklyWidgetDiv .goog-menuitem-hover {',
    'background-color: #d6e9f8;',
    'border-color: #d6e9f8;',
    'border-style: dotted;',
    'border-width: 1px 0;',
    'padding-bottom: 3px;',
    'padding-top: 3px;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-checkbox,',
    '.blocklyWidgetDiv .goog-menuitem-icon {',
    'background-repeat: no-repeat;',
    'height: 16px;',
    'left: 6px;',
    'position: absolute;',
    'right: auto;',
    'vertical-align: middle;',
    'width: 16px;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
    '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {',
    'left: auto;',
    'right: 6px;',
    '}',

    '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
    '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
    'background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-accel {',
    'color: #999;',
    'direction: ltr;',
    'left: auto;',
    'padding: 0 6px;',
    'position: absolute;',
    'right: 0;',
    'text-align: right;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {',
    'left: 0;',
    'right: auto;',
    'text-align: left;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-mnemonic-hint {',
    'text-decoration: underline;',
    '}',

    '.blocklyWidgetDiv .goog-menuitem-mnemonic-separator {',
    'color: #999;',
    'font-size: 12px;',
    'padding-left: 4px;',
    '}',

    '.blocklyWidgetDiv .goog-menuseparator {',
    'border-top: 1px solid #ccc;',
    'margin: 4px 0;',
    'padding: 0;',
    '}'
];
