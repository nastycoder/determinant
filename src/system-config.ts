/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {};

/** User packages configuration. */
const packages: any = {
  '@angular2-material/button': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'button.js'
  },
  '@angular2-material/card': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'card.js'
  },
  '@angular2-material/checkbox': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'checkbox.js'
  },
  '@angular2-material/core': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'core.js'
  },
  '@angular2-material/icon': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'icon.js'
  },
  '@angular2-material/input': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'input.js'
  },
  '@angular2-material/list': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'list.js'
  },
  '@angular2-material/sidenav': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'sidenav.js'
  },
  '@angular2-material/toolbar': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'toolbar.js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',
  '@ngrx/store',

  // App specific barrels.
  'app',
  'app/shared',
  'app/shared/dropdown-menu',
  'app/shared/matrix',
  'app/shared/matrix/src',
  'app/shared/matrix/src/apis',
  'app/shared/matrix/src/models',
  'app/shared/matrix/src/reducers',
  'app/+login',
  'app/+login/login-form',
  'app/+room',
  'app/+room/members-area',
  'app/+room/messages',
  'app/+room/message-form',
  'app/authenticated-toolbar',
  'app/authenticated-toolbar/profile-dropdown',
  'app/unauthenticated-toolbar',
  'app/sidenav',
  'app/sidenav/room-list',
  'app/sidenav/room-search',
  'app/sidenav/room-actions',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    '@angular2-material': 'vendor/@angular2-material',
    '@ngrx' : 'vendor/@ngrx',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
