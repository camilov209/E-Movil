import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';


// Pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from "../pages/login/login";
import { LoadingModulesPage } from "../pages/loading-modules/loading-modules";
import { TabFamiliesPage } from "../pages/tab-families/tab-families";
import { TabPollsPage } from "../pages/tab-polls/tab-polls";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Plugins
import { IonicStorageModule } from '@ionic/storage';

//HttpClient
import { HttpClientModule } from "@angular/common/http";

//SQLite
import { SQLite } from '@ionic-native/sqlite';

//Providers
import { CountriesProvider } from '../providers/countries/countries';
import { DepartmentsProvider } from '../providers/departments/departments';
import { MunicipalitiesProvider } from '../providers/municipalities/municipalities';
import { ZonesMunicipalitiesProvider } from '../providers/zones-municipalities/zones-municipalities';
import { QuestionsProvider } from '../providers/questions/questions';
import { OptionsProvider } from '../providers/options/options';
import { SourcesIndicatorsProvider } from '../providers/sources-indicators/sources-indicators';
import { SourcesSectionsProvider } from '../providers/sources-sections/sources-sections';
import { SectionsQuestionsProvider } from '../providers/sections-questions/sections-questions';
import { OptionsQuestionsProvider } from '../providers/options-questions/options-questions';
import { PersonalProvider } from '../providers/personal/personal';
import { FamiliesProvider } from '../providers/families/families';
import { ProjectsProvider } from '../providers/projects/projects';
import { BeneficiariesTypesProvider } from '../providers/beneficiaries-types/beneficiaries-types';
import { GendersProvider } from '../providers/genders/genders';
import { TablesModulesProvider } from '../providers/tables-modules/tables-modules';
import { SettingsServicesProvider } from '../providers/settings/settings';

//Tabs
import { SuperTabsModule } from 'ionic2-super-tabs';
import {UpdateFamilyPage} from "../pages/update-family/update-family";
import { EthnicProvider } from '../providers/ethnic/ethnic';
import {InsertFamilyPage} from "../pages/insert-family/insert-family";
import {IntroductionPage} from "../pages/introduction/introduction";
import {RecordsPage} from "../pages/records/records";

//IonTextAvatar
import { IonTextAvatar } from 'ionic-text-avatar';
import { AppliedSourceProvider } from '../providers/applied-source/applied-source';
import { AppliedSourceQuestionProvider } from '../providers/applied-source-question/applied-source-question';
import { ColorsProvider } from '../providers/colors/colors';
import {InsertAppliedSourcePage} from "../pages/insert-applied-source/insert-applied-source";

import { Geolocation } from '@ionic-native/geolocation';
import { GeopositionProvider } from '../providers/geoposition/geoposition';
import {PollsPage} from "../pages/polls/polls";
import {TextAvatarDirective} from "../directives/text-avatar/text-avatar";
import {SectionPollPage} from "../pages/section-poll/section-poll";

//Diagnostic
import { Diagnostic } from "@ionic-native/diagnostic";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    IntroductionPage,
    LoadingModulesPage,
    TabFamiliesPage,
    TabPollsPage,
    UpdateFamilyPage,
    InsertFamilyPage,
    RecordsPage,
    PollsPage,
    InsertAppliedSourcePage,
    SectionPollPage,
    TextAvatarDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    IntroductionPage,
    LoadingModulesPage,
    TabFamiliesPage,
    TabPollsPage,
    UpdateFamilyPage,
    InsertFamilyPage,
    RecordsPage,
    InsertAppliedSourcePage,
    PollsPage,
    SectionPollPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SettingsServicesProvider,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TablesModulesProvider,
    CountriesProvider,
    DepartmentsProvider,
    MunicipalitiesProvider,
    ZonesMunicipalitiesProvider,
    QuestionsProvider,
    OptionsProvider,
    SourcesIndicatorsProvider,
    SourcesSectionsProvider,
    SectionsQuestionsProvider,
    OptionsQuestionsProvider,
    PersonalProvider,
    FamiliesProvider,
    ProjectsProvider,
    BeneficiariesTypesProvider,
    GendersProvider,
    EthnicProvider,
    EthnicProvider,
    AppliedSourceProvider,
    AppliedSourceQuestionProvider,
    ColorsProvider,
    Geolocation,
    GeopositionProvider,
    Diagnostic
  ]
})
export class AppModule {}
