...
# 프로젝트 시작
npm init - node 환경
...package.json 설치됨
# dependency 설치
npm install [이름: express, cors, json, body-parser, nodemon]
- express : 백엔드 프레임워크
- cors : 프론트 백 설정
- json : json 파싱
- body-parser : 요청한 body 받기 
- nodemon : index.js 저장시 서버 새로고침
- mysql
# package.json 추가설정
### type : module 
- node.js 의 모듈시스템을 ES6 를 사용할것입을 명시한다. require가 아닌(import, from)
# api test
- postman
- REST Client (vs code extension)
# database
... create database 디피이름;
create user 유저이름@localhost identified with mysql_native_password by '비번';
grant all privileges on 디피이름.* to 유저이름@localhost;