import { useTechnologiesAnimation } from '../../hooks/useTechnologiesAnimation';
// Front-End Icons
import HTML5Icon from '../../assets/images/iconos/HTML5.svg';
import CSS3Icon from '../../assets/images/iconos/CSS3.svg';
import JavaScriptIcon from '../../assets/images/iconos/JavaScript.svg';
import TypeScriptIcon from '../../assets/images/iconos/TypeScript.svg';
import LivewireIcon from '../../assets/images/iconos/Livewire.svg';
import jQueryIcon from '../../assets/images/iconos/jQuery.svg';
import ViteIcon from '../../assets/images/iconos/Vite.js.svg';
// Back-End Icons
import PHPIcon from '../../assets/images/iconos/PHP.svg';
import LaravelIcon from '../../assets/images/iconos/Laravel.svg';
import DartIcon from '../../assets/images/iconos/Dart.svg';
import NodejsIcon from '../../assets/images/iconos/nodejs.svg';
import FlutterIcon from '../../assets/images/iconos/Flutter.svg';
import KotlinIcon from '../../assets/images/iconos/Kotlin.svg';
import SwiftUIIcon from '../../assets/images/iconos/swiftui.svg';
// Database Icons
import MySQLIcon from '../../assets/images/iconos/MySQL.svg';
import PostgresSQLIcon from '../../assets/images/iconos/PostgresSQL.svg';
import MongoDBIcon from '../../assets/images/iconos/MongoDB.svg';
// Testing Icons
import JestIcon from '../../assets/images/iconos/Jest.svg';
import PHPUnitIcon from '../../assets/images/iconos/phpunit.svg';
// Tools Icons
import GitIcon from '../../assets/images/iconos/Git.svg';
import DockerIcon from '../../assets/images/iconos/Docker.svg';
import AWSIcon from '../../assets/images/iconos/AWS.svg';
// Others Icons
import AjaxIcon from '../../assets/images/iconos/ajax.webp';
import JWTIcon from '../../assets/images/iconos/jwt.svg';
import VPNIcon from '../../assets/images/iconos/vpn.svg';
import RestAPIIcon from '../../assets/images/iconos/rest-api-icon.svg';
import GraphQLIcon from '../../assets/images/iconos/GraphQL.svg';
import AgileIcon from '../../assets/images/iconos/agile.png';

export default function TechnologiesSection() {
  const {
    tecnologiasTitleRef,
    techFrontendRef,
    techBackendRef,
    techDatabasesRef,
    techToolsRef,
    techTestingRef,
    techOthersRef,
  } = useTechnologiesAnimation();

  return (
    <section
      id="tecnologias"
      className="flex flex-col items-center justify-center px-6 py-20 relative"
    >
      <h2
        id="tecnologias-title"
        ref={tecnologiasTitleRef}
        className="text-4xl font-bold text-center mb-12 relative inline-block mx-auto"
        aria-label="Tecnologías"
      >
        <span className="relative inline-block after:content-[''] after:block after:h-[3px] after:bg-gradient-to-r after:from-[#ff9800] after:to-[#ff9800] after:w-full after:mt-2 mr-3">
          Tecnologías
        </span>
        <span className="text-[#ff9800]">utilizadas</span>
      </h2>

      <div className="w-full max-w-7xl mx-auto">
        {/* Primera fila: Front-End y Back-End */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Card Front-End */}
          <div
            id="tech-frontend"
            ref={techFrontendRef}
            className="w-full md:w-1/2 border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 md:p-8 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <h3 className="text-xl font-bold text-[#ff9800] mb-4">Front-End</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={HTML5Icon}
                  alt="HTML5"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  HTML 5
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={CSS3Icon}
                  alt="CSS3"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  CSS 3
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={JavaScriptIcon}
                  alt="JavaScript"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  JavaScript
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={TypeScriptIcon}
                  alt="JavaScript"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  TypeScript
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <svg
                  className="tech-icon"
                  width="36"
                  height="36"
                  viewBox="-11.5 -10.232 23 20.463"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
                  <g stroke="#61DAFB" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                  </g>
                </svg>
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  React
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img 
                  src={ViteIcon}
                  alt="Vite"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  Vite
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={LivewireIcon}
                  alt="Livewire"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  Livewire
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={jQueryIcon}
                  alt="jQuery"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  jQuery
                </span>
              </div>
            </div>
          </div>

          {/* Card Back-End */}
          <div
            id="tech-backend"
            ref={techBackendRef}
            className="w-full md:w-1/2 border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 md:p-8 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <h3 className="text-xl font-bold text-[#ff9800] mb-4">Back-End</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={PHPIcon}
                  alt="PHP"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  PHP
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={LaravelIcon}
                  alt="Laravel"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  Laravel
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={DartIcon}
                  alt="Dart"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  Dart
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={NodejsIcon}
                  alt="Node.js"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  Node.js
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={FlutterIcon}
                  alt="Flutter"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  Flutter
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={KotlinIcon}
                  alt="Kotlin"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  Kotlin
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5 w-[calc(33.333%-11px)] sm:w-[calc(25%-12px)] min-w-[80px]">
                <img
                  src={SwiftUIIcon}
                  alt="SwiftUI"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  SwiftUI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Segunda fila: Databases, Testing, Tools & Others */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Card Databases */}
          <div
            id="tech-databases"
            ref={techDatabasesRef}
            className="w-full md:w-1/3 border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 md:p-8 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <h3 className="text-xl font-bold text-[#ff9800] mb-4">Databases</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center">
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                <img
                  src={MySQLIcon}
                  alt="MySQL"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  MySQL
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                <img
                  src={PostgresSQLIcon}
                  alt="PostgreSQL"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  PostgreSQL
                </span>
              </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                <img
                  src={MongoDBIcon}
                  alt="MongoDB"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  MongoDB
                </span>
              </div>
            </div>
          </div>

          {/* Card Testing */}
          <div
            id="tech-testing"
            ref={techTestingRef}
            className="w-full md:w-1/3 border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 md:p-8 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <h3 className="text-xl font-bold text-[#ff9800] mb-4">Testing</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-8 justify-items-center">
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                <img
                  src={PHPUnitIcon}
                  alt="PHPUnit"
                  className="tech-icon h-5"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  PHPUnit
                </span>
              </div>
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <svg
                    className="h-5 text-gray-700 dark:text-white transition duration-100 ease-in-out hover:-rotate-2 hover:scale-104 hover:drop-shadow-2xl"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 381 100"
                    aria-label="Pest Logo"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M16.6067 27.5097 22.9939 0h56.7875c15.6811 0 25.5336 12.3165 22.0066 27.5097l-1.9167 8.2529c-3.5272 15.1932-19.099 27.5097-34.7805 27.5097H36.697l-8.3033 35.7624H0l14.6906-63.2721h56.787l1.9166-8.2529H16.6067ZM295.574 0h85.181c-3.528 15.1932-19.1 27.5097-34.781 27.5097h-11.358l-16.606 71.525h-28.394l16.607-71.525h-73.824l-1.917 8.2529h28.394c15.682 0 25.535 12.3165 22.007 27.5097l-1.916 8.2526c-3.527 15.1937-19.1 27.5098-34.781 27.5098h-56.787l6.387-27.5098h56.787l1.916-8.2526h-28.394c-15.681 0-25.533-12.3165-22.006-27.5097l1.916-8.2529C207.532 12.3165 223.105 0 238.786 0h56.788Zm-93.7 0h-85.181l-6.387 27.5097h85.181L201.874 0Zm-25.34 35.7626h-68.145l-6.387 27.5097h68.145l6.387-27.5097Zm8.734 35.7623h-85.182l-6.3867 27.5098H178.88l6.388-27.5098Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    Pest
                  </span>
                </div>
              <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                <img
                  src={JestIcon}
                  alt="Jest"
                  className="tech-icon w-9 h-9"
                />
                <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                  Jest
                </span>
              </div>
            </div>
          </div>

          {/* Card Tools & Others */}
          <div
            id="tech-tools"
            ref={techToolsRef}
            className="w-full md:w-1/3 border border-[rgba(189,189,189,0.22)] rounded-3xl p-6 md:p-8 backdrop-blur-[10px] dark:[background:linear-gradient(var(--tc-bg-3),var(--tc-bg-3))_padding-box,linear-gradient(var(--angle),var(--tc-bg-3)_90%,var(--primary-color)_100%)_border-box] [background:linear-gradient(var(--tc-bg-1),var(--tc-bg-1))_padding-box,linear-gradient(var(--angle),var(--tc-bg-1)_90%,var(--primary-color)_100%)_border-box] [animation:rotate_6s_linear_infinite]"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#ff9800] mb-4">
                Tools & Platforms
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <img
                    src={GitIcon}
                    alt="Git"
                    className="tech-icon w-9 h-9"
                  />
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    Git
                  </span>
                </div>
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <img
                    src={DockerIcon}
                    alt="Docker"
                    className="tech-icon w-9 h-9"
                  />
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    Docker
                  </span>
                </div>
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <img
                    src={AWSIcon}
                    alt="AWS"
                    className="tech-icon w-9 h-9"
                  />
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    AWS
                  </span>
                </div>
              </div>
            </div>

            <div id="tech-others" ref={techOthersRef}>
              <h3 className="text-xl font-bold text-[#ff9800] mb-4">Others</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <img
                    src={AjaxIcon}
                    alt="Ajax"
                    className="tech-icon h-9"
                  />
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    Ajax
                  </span>
                </div>
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <img
                    src={JWTIcon}
                    alt="JWT"
                    className="tech-icon w-9 h-9"
                  />
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    JWT
                  </span>
                </div>
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <img
                    src={VPNIcon}
                    alt="VPS"
                    className="tech-icon w-9 h-9"
                  />
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    VPS
                  </span>
                </div>
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <img
                    src={RestAPIIcon}
                    alt="RESTful APIs"
                    className="tech-icon w-9 h-9 dark:brightness-0 dark:invert"
                  />
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    RESTful APIs
                  </span>
                </div>
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <img
                    src={GraphQLIcon}
                    alt="GraphQL"
                    className="tech-icon w-9 h-9"
                  />
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    GraphQL
                  </span>
                </div>
                <div className="tech-icon-wrapper flex flex-col items-center gap-1.5">
                  <img
                    src={AgileIcon}
                    alt="Agile"
                    className="tech-icon w-9 h-9"
                  />
                  <span className="text-gray-800 dark:text-white text-xs font-medium text-center">
                    Agile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
