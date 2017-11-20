var app = angular.module('GroupApp', ['ngMaterial']);

// https://stackoverflow.com/a/16349631
app.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});

app.controller('AppCtrl', ['$scope', '$mdSidenav', 'studentService', function ($scope, $mdSidenav, studentService) {
    var allStudents = [];


    $scope.subgroups = [1, 2];
    $scope.selectedsubgroups = [1, 2];
    $scope.isChosenOnly = false;
    //$scope.toggle = function (item, list) {
    //  var idx = list.indexOf(item);
    //  if (idx >-1) {
    //    list.splice(idx, 1);
    //  } else {
    //    list.push(item);
    //  }
    //};
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.toggleChosen = function (item) {
        $scope.isChosenOnly = !$scope.isChosenOnly;
    };
    //$scope.filterBySubgroup = function (student) {
    //  return $scope.exists(student.subgroup, $scope.selectedsubgroups);
    //};

    $scope.filterByChosen = function (student) {
        if ($scope.isChosenOnly) {
            if (student.isChosenProject) {
                console.log(student);
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    $scope.filterByData = function (student) {
        if (!student.websiteUrl || !student.codeSourceUrl) {
            return false;
        }
        return true;
    }

    $scope.selected = null;
    $scope.students = allStudents;
    $scope.selectStudent = selectStudent;
    $scope.toggleSidenav = toggleSidenav;

    loadStudents();

    function loadStudents() {
        studentService.loadAll()
            .then(function (students) {
                allStudents = students;
                $scope.students = [].concat(students);
                $scope.selected = $scope.students[0];
            })
    }

    function toggleSidenav(name) {
        $mdSidenav(name).toggle();
    }

    function selectStudent(student) {
        $scope.selected = angular.isNumber(student) ? $scope.students[student] : student;
        $scope.toggleSidenav('left');
    }

    $scope.getPhotoUrl = function(student) {
        if (!student) return null;
        return student.photo || `images/students/${getLastName(student.name)}.jpg`;
    }

    function getLastName(fullName) {
        return fullName.trim().split(' ').pop().replace(/'+/g, '').toLowerCase();
    }

}]);

app.service('studentService', ['$q', function ($q) {

    //! http://www.convertcsv.com/csv-to-json.htm
    // http://www.csvjson.com/csv2json
    var students = [
        // {
        //   "name": "Adrian Sarab",
        //   "websiteUrl": "",
        //   "codeSourceUrl": "",
        //   "cvUrl": ""
        // },
        {
          "name": "Dmytro Kharysh",
          "websiteUrl": "https://kharysh207.github.io/portfolio/",
          "codeSourceUrl": "https://github.com/Kharysh207/portfolio",
          "cvUrl": "https://github.com/Kharysh207/portfolio/blob/gh-pages/images/photo-kharysh.jpg"
        },
        {
          "name": "Evita Kusinya",
          "websiteUrl": "https://evittta.github.io/project/",
          "codeSourceUrl": "https://github.com/Evittta/project",
          "cvUrl": "https://github.com/Evittta/project/blob/gh-pages/img/evita-kusinya.jpg"
        },
        {
          "name": "Iryna Pavlyuk",
          "websiteUrl": "https://ipavlyuk.github.io/project-01/",
          "codeSourceUrl": "https://github.com/ipavlyuk/the-carpathians-project",
          "cvUrl": "https://github.com/ipavlyuk/photo/blob/gh-pages/photo_project.jpg"
        },
        {
          "name": "Iryna Kostiv",
          "websiteUrl": "https://irynakostiv.github.io/my-website/",
          "codeSourceUrl": "https://github.com/irynakostiv/my-website",
          "cvUrl": "https://github.com/irynakostiv/my-website/blob/gh-pages/img/my-photo.png",
          "photo": "images/students/kostiv.png"
        },
        {
          "name": "Iryna Chebeniak",
          "websiteUrl": "",
          "codeSourceUrl": "",
          "cvUrl": ""
        },
        {
          "name": "Mykola Savych",
          "websiteUrl": "https://nicholas-ua.github.io/MySite/",
          "codeSourceUrl": "https://github.com/Nicholas-ua/MySite",
          "cvUrl": "https://avatars2.githubusercontent.com/u/32941380?s=400&u=1ec35baa851f6bc861fc231390a73c6ef965d7d5&v=4",
          "photo": "images/students/savych.png"          
        },
        {
          "name": "Nadiia Koshel",
          "websiteUrl": "https://nkosholka.github.io/rozmitka/",
          "codeSourceUrl": "https://github.com/nkosholka/rozmitka",
          "cvUrl": ""
        },
        {
          "name": "Oleg Blishch",
          "websiteUrl": "https://olegblishch88.github.io/fullproject/",
          "codeSourceUrl": "https://github.com/olegblishch88/fullproject",
          "cvUrl": ""
        },
        {
          "name": "Roman Bechkalo",
          "websiteUrl": "https://bechkaloroman.github.io/my-website/",
          "codeSourceUrl": "https://github.com/BechkaloRoman/my-website",
          "cvUrl": "https://github.com/BechkaloRoman/my-website/blob/gh-pages/photo/my-photo.jpg"
        },
        {
          "name": "Yevhenii Perkhun",
          "websiteUrl": "https://evgperhun.github.io/mobile-first/",
          "codeSourceUrl": "https://github.com/evgperhun/mobile-first",
          "cvUrl": ""
        },
        {
          "name": "Vedanta Zorii",
          "websiteUrl": "https://wedanta.github.io/website/",
          "codeSourceUrl": "https://github.com/Wedanta/website",
          "cvUrl": "https://github.com/Wedanta/portfolio/blob/gh-pages/images/potfolio.jpg"
        },
        {
          "name": "Olena Panchuk",
          "websiteUrl": "https://funnycatss.github.io/Butterfly/",
          "codeSourceUrl": "https://github.com/funnycatss/Butterfly",
          "cvUrl": "https://github.com/funnycatss/My-page/blob/gh-pages/mini.png",
          "photo": "images/students/panchuk.png"          
        },
        {
          "name": "Andriy Trots",
          "websiteUrl": "https://andrewnit.github.io/first-project/",
          "codeSourceUrl": "https://github.com/AndrewNit/first-project",
          "cvUrl": "https://github.com/AndrewNit/first-project/blob/gh-pages/img/my-photo.jpg"
        },
        {
          "name": "Antonina Pasichnyk",
          "websiteUrl": "https://tonia8.github.io/studio-perfection/",
          "codeSourceUrl": "https://github.com/tonia8/studio-perfection",
          "cvUrl": "https://github.com/tonia8/studio-perfection/blob/gh-pages/foto.jpg"
        },
        {
          "name": "Oleksandr Morozov",
          "websiteUrl": "https://moralex260.github.io/my_project/",
          "codeSourceUrl": "https://github.com/moralex260/my_project",
          "cvUrl": "https://www.linkedin.com/in/%D0%B0%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80-%D0%BC%D0%BE%D1%80%D0%BE%D0%B7%D0%BE%D0%B2-50480a138/",
          "photo": "images/students/morozov.png"
        },
        {
          "name": "Olga Grabchak",
          "websiteUrl": "https://olgagrab.github.io/website/",
          "codeSourceUrl": "https://github.com/OlgaGrab/website",
          "cvUrl": "https://drive.google.com/open?id=17FeMaxFoRGYhdIiu6w9IazHff0rvxYQw"
        },
        {
          "name": "Serhiy Plotitsyn",
          "websiteUrl": "https://maxsasd.github.io/homework-4/",
          "codeSourceUrl": "https://github.com/MaxsaSD/homework-4",
          "cvUrl": ""
        },
        {
          "name": "Sviatoslav Orest Terletskyi",
          "websiteUrl": "https://svyatko.github.io/svyatko-blade/",
          "codeSourceUrl": "https://github.com/Svyatko/svyatko-blade",
          "cvUrl": "https://github.com/Svyatko/bootstrap-test/blob/gh-pages/photo_2017-11-17_17-23-27.jpg"
        },
        {
          "name": "Svitlana Melashenko",
          "websiteUrl": "https://prikordonna.github.io/personal-portfolio/",
          "codeSourceUrl": "https://github.com/prikordonna/personal-portfolio",
          "cvUrl": "https://github.com/prikordonna/personal-portfolio/blob/gh-pages/img/my-photo.jpg"
        },
        {
          "name": "Andriy Levkiv",
          "websiteUrl": "https://andythereal.github.io/my-page/",
          "codeSourceUrl": "https://github.com/andythereal/my-page",
          "cvUrl": "https://github.com/andythereal/my-page/blob/gh-pages/img/andriy-levkiv-photo.jpg"
        },
        {
          "name": "Petro Lytsar",
          "websiteUrl": "https://lytsarp.github.io/TopBurner/",
          "codeSourceUrl": "https://github.com/LytsarP/TopBurner",
          "cvUrl": "https://drive.google.com/open?id=1SirtM894IofrvFHMRVjK86v0MN08PY9V"
        },
        {
          "name": "Svitlana Levyts’ka",
          "websiteUrl": "https://svitana.github.io/personal-website/",
          "codeSourceUrl": "https://github.com/svitana/personal-website",
          "cvUrl": "https://github.com/svitana/personal-website/blob/gh-pages/spring.jpg",
          "photo": "images/students/levytska.jpg"                    
        },
        {
          "name": "Oleksandr Saiuk",
          "websiteUrl": "https://bbugsbunny.github.io/project-rise/",
          "codeSourceUrl": "https://github.com/bbugsbunny/project-rise",
          "cvUrl": "https://www.dropbox.com/s/cfax9qusubib8du/Sayuk_Oleksandr_foto_cv.JPG?dl=0",
        },
        {
          "name": "Kateryna Tokarenko",
          "websiteUrl": "https://ekaterinatokarenko.github.io/webpage/",
          "codeSourceUrl": "https://github.com/ekaterinatokarenko/webpage",
          "cvUrl": "https://github.com/ekaterinatokarenko/photo/blob/gh-pages/kate.jpg"
        }
      ];

    // Promise-based API
    return {
        loadAll: function () {
            // Simulate async nature of real remote calls
            return $q.when(students);
        }
    };
}]);
