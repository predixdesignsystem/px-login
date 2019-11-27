/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-icon-set/px-icon-set.js';
import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import '../px-login.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Header -->
    <px-demo-header module-name="px-login" description="The px-login element provides a login/logout button that integrates nicely with Cloud Foundry's UAA.  (Note that Sign In does not work in this demo page.  You can set the User name property to simulate sign in here.)" mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <!-- Code Editor -->
      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component">
        <px-login id="comp" user-name="{{props.userName.value}}" user-name-key="display_name" popover-location="{{props.popoverLocation.value}}" menu-items="{{props.menuItems.value}}" user-info-url\$="[[importPath]]../user-info-sample.json" custom-user-icon="{{props.customUserIcon.value}}">
          <template is="dom-if" if="{{props.customUserIcon.value}}">
            <img slot="custom-icon" src\$="[[importPath]]Edison.png">
          </template>
        </px-login>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-login">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-login"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-login-demo',

  properties: {

    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    configs: {
      type: Array,
      value: function(){
        return [
          { configName: "Default",
            configReset: true }
        ]
      }
    }
  },

  /**
   * A reference for `this.props`. Read the documentation there.
   */
  demoProps: {
    userName: {
      type: String,
      defaultValue: 'Sample User',
      inputType: 'text'
    },
    popoverLocation: {
      type: String,
      defaultValue: 'bottom',
      inputType: 'dropdown',
      inputChoices: ['top', 'bottom', 'left', 'right']
    },
    menuItems: {
      type: Array,
      defaultValue: [{url: "", label: "Settings"}, {url: "", label: "My Account"}],
      inputType: "code:JSON"
    },
    customUserIcon: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    }
  },

  attached: function() {
    this.$.comp.$.loginButton.removeEventListener('click', this.$.comp.loginClicked);
    this.$.comp.$.logoutButton.removeEventListener('click', this.$.comp.logoutClicked);
  }
});
