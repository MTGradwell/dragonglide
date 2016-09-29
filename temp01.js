var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight-60 );
document.body.appendChild( renderer.domElement );
var DB2_mat={}, db2mat=function(){}, landmat=4, sizmat=48, halfmat=sizmat/2, foo=1, x=0, y=0, xElem, yElem;
window.onclick = function() {foo=1-foo;
if(!foo){	pldragon.rotation.set( 0, 5.5, 0 );} else {pldragon.rotation.set( 0, 8.64, 0 );}

}

mm1(landmat,sizmat*100,sizmat*100,sizmat,sizmat);
seth(4,10,10,400);//mat,x,z,h
setup1();
render();
function render() {
	requestAnimationFrame(render);
	//DB2_mat[landmat].ground.rotation.y += 0.02;
	rend1();
	renderer.render(scene, camera);
}
function rend1(){
	if (foo){
		sd(landmat);
		buildtop(landmat);

		sl(landmat);
		buildright(landmat);
x++; y++;
	}
	else{
		buildright(landmat);
		sr(landmat);

		buildtop(landmat);
		su(landmat);
x--;y--;
	}
if(!yElem){
xElem=document.getElementById("x");
yElem=document.getElementById("y");
}
xElem.innerHTML = x.toString();

yElem.innerHTML = y.toString();


}

function seth(mat_no,x,z,h){
	parmzsegs=DB2_mat[mat_no].zsegs;
	parmxsegs=DB2_mat[mat_no].xsegs;

 	lcl_setsize=parmxsegs*parmzsegs;

	jom2=DB2_mat[mat_no].geometry;
	ix=x+z*parmzsegs;//ix=col+row*cols, x+z*parmzsegs
    	jom2.vertices[ix].y=h;
    	jom2.vertices[ix+lcl_setsize].y=h;
    	jom2.vertices[ix+lcl_setsize+lcl_setsize].y=h;
    	jom2.vertices[ix+lcl_setsize+lcl_setsize+lcl_setsize].y=h;
	jom2.verticesNeedUpdate=true;
}
function sr(parm_no){
	var parmzsegs, parmxsegs, lclzseg, lclxseg;
	var temp=[];
	parmzsegs=DB2_mat[parm_no].zsegs;
	parmxsegs=DB2_mat[parm_no].xsegs;
	lcl_setsize = parmxsegs * parmzsegs;

	jom2=DB2_mat[parm_no].geometry;
	//for each row
	for(lclzseg=0; lclzseg<=parmzsegs-1;lclzseg++){
		//rightmost  -> temp
		ixFrom=parmxsegs-1+lclzseg*parmxsegs;
		temp=jom2.vertices[ixFrom].y;
		//for(lclxseg=0; lclxseg<=parmxsegs-1;lclxseg++){
		for(lclxseg=parmxsegs-2; lclxseg>=0;lclxseg--){//for each col except last
			//col -> col+1
			ixFrom=lclxseg+lclzseg*parmxsegs;//col+row*cols
			ixTo=lclxseg+1+lclzseg*parmxsegs;//col+1+row*cols
     			height=jom2.vertices[ixFrom].y;
    			jom2.vertices[ixTo].y=height;
			jom2.vertices[ixTo+lcl_setsize].y=height;
			jom2.vertices[ixTo+lcl_setsize+lcl_setsize].y=height;
			jom2.vertices[ixTo+lcl_setsize+lcl_setsize+lcl_setsize].y=height;
		}//Next;
		//temp-> leftmost
		ixTo = lclxseg*0+lclzseg*parmxsegs;
    		jom2.vertices[ixTo].y=temp;
		jom2.vertices[ixTo+lcl_setsize].y=temp;
		jom2.vertices[ixTo+lcl_setsize+lcl_setsize].y=temp;
		jom2.vertices[ixTo+lcl_setsize+lcl_setsize+lcl_setsize].y=temp;
		
	}//Next;
	DB2_mat[parm_no].geometry.verticesNeedUpdate=true;
}
function sl(parm_no){
	var parmzsegs, parmxsegs, lclzseg, lclxseg;
	var temp=[];
	parmzsegs=DB2_mat[parm_no].zsegs;
	parmxsegs=DB2_mat[parm_no].xsegs;
	lcl_setsize = parmxsegs * parmzsegs;

	jom2=DB2_mat[parm_no].geometry;
	//for each row
	for(lclzseg=0; lclzseg<=parmzsegs-1;lclzseg++){
		//leftmost  -> temp
		//ixFrom=parmxsegs-1+lclzseg*parmxsegs;
		ixFrom=0+lclzseg*parmxsegs;
		temp=jom2.vertices[ixFrom].y;
		for(lclxseg=0; lclxseg<=parmxsegs-2;lclxseg++){//for each col except last
		//for(lclxseg=parmxsegs-2; lclxseg>=0;lclxseg--){//for each col except last
			//col -> col+1
			ixTo=lclxseg+lclzseg*parmxsegs;//col+row*cols
			ixFrom=lclxseg+1+lclzseg*parmxsegs;//col+1+row*cols
     			height=jom2.vertices[ixFrom].y;
    			jom2.vertices[ixTo].y=height;
			jom2.vertices[ixTo+lcl_setsize].y=height;
			jom2.vertices[ixTo+lcl_setsize+lcl_setsize].y=height;
			jom2.vertices[ixTo+lcl_setsize+lcl_setsize+lcl_setsize].y=height;
		}//Next;
		//temp-> rightmost
		//ixTo = lclxseg*0+lclzseg*parmxsegs;
		ixTo = parmxsegs-1+lclzseg*parmxsegs;
    		jom2.vertices[ixTo].y=temp;
		jom2.vertices[ixTo+lcl_setsize].y=temp;
		jom2.vertices[ixTo+lcl_setsize+lcl_setsize].y=temp;
		jom2.vertices[ixTo+lcl_setsize+lcl_setsize+lcl_setsize].y=temp;
	}//Next;
	DB2_mat[parm_no].geometry.verticesNeedUpdate=true;
}
function su(parm_no){
	var parmzsegs, parmxsegs, lclzseg, lclxseg;
	var temp=[];
	parmzsegs=DB2_mat[parm_no].zsegs;
	parmxsegs=DB2_mat[parm_no].xsegs;
	lcl_setsize = parmxsegs * parmzsegs;
	jom2=DB2_mat[parm_no].geometry;
	//for each col
	for(lclxseg=0; lclxseg<=parmxsegs-1;lclxseg++){
		//topmost  -> temp
		ixFrom= lclxseg +(parmzsegs-1)*parmzsegs;
		temp=jom2.vertices[ixFrom].y;
		for(lclzseg=parmzsegs-1; lclzseg>=1;lclzseg--){//for each row except 0th
			//row-1 -> row
			ixFrom=lclxseg+(lclzseg-1)*parmxsegs//col+(row-1)*cols
			ixTo=lclxseg+lclzseg*parmxsegs;//col+row*cols
     			height=jom2.vertices[ixFrom].y;
    			jom2.vertices[ixTo].y=height;
			jom2.vertices[ixTo+lcl_setsize].y=height;
			jom2.vertices[ixTo+lcl_setsize+lcl_setsize].y=height;
			jom2.vertices[ixTo+lcl_setsize+lcl_setsize+lcl_setsize].y=height;
		}//Next;
		//temp-> bottommost (0th) row
		ixTo = lclxseg;
    		jom2.vertices[ixTo].y=temp;
		jom2.vertices[ixTo+lcl_setsize].y=temp;
		jom2.vertices[ixTo+lcl_setsize+lcl_setsize].y=temp;
		jom2.vertices[ixTo+lcl_setsize+lcl_setsize+lcl_setsize].y=temp;
		
	}//Next;
	DB2_mat[parm_no].geometry.verticesNeedUpdate=true;
}
function sd(parm_no){
	var parmzsegs, parmxsegs, lclzseg, lclxseg;
	var temp=[];
	parmzsegs=DB2_mat[parm_no].zsegs;
	parmxsegs=DB2_mat[parm_no].xsegs;
	lcl_setsize = parmxsegs * parmzsegs;
	jom2=DB2_mat[parm_no].geometry;
	//for each col
	for(lclxseg=0; lclxseg<=parmxsegs-1;lclxseg++){
		//bottommost  -> temp
		ixFrom=lclxseg;
		temp=jom2.vertices[ixFrom].y;
		for(lclzseg=0; lclzseg<=parmzsegs-2;lclzseg++){//for each row except topmost
			//row+1 -> row
			ixFrom=lclxseg+(lclzseg+1)*parmxsegs//col+(row+1)*cols
			ixTo=lclxseg+lclzseg*parmxsegs;//col+row*cols
     			height=jom2.vertices[ixFrom].y;
    			jom2.vertices[ixTo].y=height;
		}//Next;
		//temp-> topmost
		ixTo = (parmzsegs-1)*parmzsegs+lclxseg;
    		jom2.vertices[ixTo].y=temp;
		jom2.vertices[ixTo+lcl_setsize].y=temp;
		jom2.vertices[ixTo+lcl_setsize+lcl_setsize].y=temp;
		jom2.vertices[ixTo+lcl_setsize+lcl_setsize+lcl_setsize].y=temp;
	}//Next;
	DB2_mat[parm_no].geometry.verticesNeedUpdate=true;
}

function buildtop(){
//rem build new row of terrain. if((done before shift down, new row end up at bottom of grid
for(n=1;n<=sizmat-2;n++){
 temp=get_matrix_height(landmat,n,sizmat-1);
  temp+=get_matrix_height(landmat,n+1,halfmat-1);
  temp+=get_matrix_height(landmat,n-1,halfmat-1);
 temp=wrapvalue(360-temp);
settile(landmat,n,sizmat-1,temp);
}//next n
//rem n=0
temp=0;
  temp+=get_matrix_height(landmat,sizmat-1,halfmat-1);
  temp+=get_matrix_height(landmat,halfmat-1,halfmat-2);
  temp+=get_matrix_height(landmat,halfmat-1,halfmat);
 temp=wrapvalue(360-temp);
 temp+=get_matrix_height(landmat,0,sizmat-1);
 temp+=get_matrix_height(landmat,1,halfmat-1);
 temp=wrapvalue(360-temp);
 settile(landmat,0,sizmat-1,temp);
//rem n=sizmat-1
 temp=0;
 temp+=get_matrix_height(landmat,0,halfmat-1);
 temp+=get_matrix_height(landmat,halfmat,halfmat-2);
 temp+=get_matrix_height(landmat,halfmat,halfmat);
 temp=wrapvalue(360-temp);
 temp+=get_matrix_height(landmat,sizmat-1,sizmat-1);
 temp+=get_matrix_height(landmat,sizmat-2,halfmat-1);
 temp=wrapvalue(360-temp);

 settile(landmat,sizmat-1,sizmat-1,temp);
return;
}//;rem end buildtop

function buildright(){
//rem build new column of terrain. if((done before shift right, new row end up at left of grid
 for(n=1;n<=sizmat-2;n++){
 temp=get_matrix_height(landmat,sizmat-1,n);
 temp+=get_matrix_height(landmat,halfmat-1,n+1);
 temp+=get_matrix_height(landmat,halfmat-1,n-1);
 temp=wrapvalue(360-temp);
settile(landmat,sizmat-1,n,temp);
//rem settile(sizmat,n,0)

 }//next n
//rem n=0
 temp=get_matrix_height(landmat,halfmat-1,sizmat-1);
  temp+=get_matrix_height(landmat,halfmat-2,halfmat-1);
  temp+=get_matrix_height(landmat,halfmat,halfmat-1);
 temp=wrapvalue(360-temp);
  temp+=get_matrix_height(landmat,sizmat-1,0);
  temp+=get_matrix_height(landmat,halfmat-1,1);
 temp=wrapvalue(360-temp);
 settile(landmat,sizmat-1,0,temp);
//rem n=sizmat-1
 temp=0;
  temp+=get_matrix_height(landmat,halfmat-1,0);
  temp+=get_matrix_height(landmat,halfmat-2,halfmat);
  temp+=get_matrix_height(landmat,halfmat,halfmat);
 temp=wrapvalue(360-temp);
  temp+=get_matrix_height(landmat,sizmat-1,sizmat-1);
  temp+=get_matrix_height(landmat,halfmat-1,sizmat-2);
 temp=wrapvalue(360-temp);
 settile(landmat,sizmat-1,sizmat-1,temp);
return;
}//rem end buildright

function wrapvalue(n){return ((n%360)+360) % 360;}

function get_matrix_height(parm_no,x,z){
	parmxsegs=DB2_mat[parm_no].xsegs;
	jom2=DB2_mat[parm_no].geometry;
	ix=x+z*parmxsegs;
	return jom2.vertices[ix].y;
}
function settile(landmat,x,y,h){
 set_matrix_height(landmat,x,y,h);
//if(h <20 ){ set_matrix_tile(landmat,x,y,2);} else {set_matrix_tile(landmat,x,y,1);}
}//endfunction
function set_matrix_height(parm_no,x,z,h){
	parmxsegs=DB2_mat[parm_no].xsegs;
	parmzsegs=DB2_mat[parm_no].zsegs;
 	lcl_setsize=parmxsegs*parmzsegs;
	jom2=DB2_mat[parm_no].geometry;
	ix=x+z*parmxsegs;
	jom2.vertices[ix].y=h;
	jom2.vertices[ix+lcl_setsize].y=h;
	jom2.vertices[ix+lcl_setsize+lcl_setsize].y=h;
	jom2.vertices[ix+lcl_setsize+lcl_setsize+lcl_setsize].y=h;
}
function mm1(parm_no,parmwidth,parmdepth,parmxsegs,parmzsegs){
    	DB2_mat[parm_no]=new db2mat();
	DB2_mat[parm_no].width=parmwidth;
	DB2_mat[parm_no].depth=parmdepth;
	DB2_mat[parm_no].xsegs=parmxsegs;
	DB2_mat[parm_no].zsegs=parmzsegs;
	var lcl_tilewidth=parmwidth/parmxsegs;
	DB2_mat[parm_no].tilewidth=lcl_tilewidth;

	var lcl_setsize=parmxsegs*parmzsegs;
	var jom2 = new THREE.Geometry();	
	for(var lcl_iter=1; lcl_iter <=4; lcl_iter++){
		for(lclzseg=0; lclzseg<=parmzsegs-1;lclzseg++){
			for(lclxseg=0; lclxseg<=parmxsegs-1;lclxseg++){
				if((lclzseg ===0) || (lclzseg==parmzsegs-1)  ||   (lclxseg ===0) || (lclxseg==parmxsegs-1) ){
  					lhite=-7;} 
				else {
    					lhite=1;}
				lhite=100+lclzseg+lclxseg;
				lhite=359;
				jom2.vertices.push( new THREE.Vector3( lclxseg*lcl_tilewidth,lhite,-lclzseg*lcl_tilewidth ) );
			}//Next;
		}//Next;
	}//Next;
	gridX=parmxsegs; gridZ = parmzsegs;
	for(lclzseg=0; lclzseg<parmzsegs-1;lclzseg++){
		for(lclxseg=0; lclxseg<parmxsegs-1;lclxseg++){
			if(Math.random()>0){//.01
			vert0=lclzseg+lclxseg*parmzsegs;
			vert1=(lclzseg+(lclxseg+1)*parmzsegs);
			vert2=((lclzseg+1)+lclxseg*parmzsegs);
			vert3=((lclzseg+1)+(lclxseg+1)*parmzsegs);
			face = new THREE.Face3( vert2,vert1,vert0 );
			jom2.faces.push( face );
			face = new THREE.Face3( vert1,vert2,vert3 );
			jom2.faces.push( face );

			ix=lclxseg; iz=lclzseg;
			var uva = new THREE.Vector2( ix / gridX, 1 - iz / gridZ );
			var uvb = new THREE.Vector2( ix / gridX, 1 - ( iz + 1 ) / gridZ );
			var uvc = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - ( iz + 1 ) / gridZ );
			var uvd = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - iz / gridZ );
			jom2.faceVertexUvs[ 0 ].push( [ uva, uvb, uvd ] );
			jom2.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc, uvd.clone() ] );

			}
		}//Next;
	}//Next;
	DB2_mat[parm_no].geometry=jom2;
	DB2_mat[parm_no].ground = new THREE.Mesh( DB2_mat[parm_no].geometry, DB2_mat[parm_no].Material );
}
function setup1(){
	scene.add( new THREE.AmbientLight( 0x777777 ) );
	testmaterial3=new THREE.MeshDepthMaterial();
	camera.position.set(2500, 800, 50);
	camera.lookAt(new THREE.Vector3( 2500, 400, -500));
	DB2_mat[landmat].Material=testmaterial3;
	DB2_mat[landmat].ground = new THREE.Mesh( DB2_mat[landmat].geometry, DB2_mat[landmat].Material );
	scene.add( DB2_mat[landmat].ground );
				scene.fog = new THREE.Fog( 0x050505, 500, 3000 );

var loader = new THREE.STLLoader();
loader.addEventListener( 'load', function ( event ) {
	draggeometry = event.content;
	dragmaterial = new THREE.MeshNormalMaterial();// { ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 } );
	pldragon = new THREE.Mesh( draggeometry, dragmaterial );
	pldragon.position.set( 2500, 790, 20 );
	pldragon.rotation.set( 0, 8.64, 0 );
	pldragon.scale.set( 0.5, 0.5, 0.5 );
	pldragon.castShadow = true;
	pldragon.receiveShadow = true;
	pldragon.name="pldragon";
	scene.add( pldragon );
	asJS=JSON.stringify(draggeometry, null, ' ');
 	var div = document.createElement('div');
  	div.innerHTML = asJS;

	//document.getElementById("body").appendChild(div);
	document.body.appendChild(div);
} );

loader.load( './dragon2.stl' );



}

