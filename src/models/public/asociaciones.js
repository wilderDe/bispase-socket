const { Persona } = require("./persona.model");
const { Usuario } = require("./usuario.model");
const { Entidad } = require("./entidad.model");
const { Perfil } = require("./perfil.model");
const { Area } = require("./area.model");
const { PerfilMenu } = require("./perfil_menu.model");
const { Menu } = require("./menu.model");
const { UsuarioPerfil } = require("./usuario_perfil.model");

/**
 * NOTA: verificar si este archivo esta 
 * importado en la seccion de comentario "importar asociaciones de schemas"
 * que se encuentra en el archivo server.js
 * el archivo de asociacion o relación si se crea otro schema.
 */

/* ------------ ESCHEMA PUBLIC ------------*/

// una persona solo puede tener un usuario
// relacion uno a uno
// TABLAS
// usu_suario -> per_personas
Persona.hasOne(Usuario, {
    foreignKey: 'per_id',
    sourceKey: 'per_id'
});

Usuario.belongsTo(Persona, {
    foreignKey: 'per_id',
    sourceKey: 'per_id'
});


// una entidad puede tener muchos perfiles
// relacion de uno a muchos
// TABLAS
// perf_perfiles -> ent_entidades
Entidad.hasMany(Perfil, {
    foreignKey: 'ent_id',
    sourceKey: 'ent_id'
});

Perfil.belongsTo(Entidad, {
    foreignKey: 'ent_id',
    sourceKey: 'ent_id'
});

// muchos perfiles pertenecesn a una are_area
// recion de uno a muchos 
// TABLAS
// perf_perfiles -> are_areas
Area.hasMany(Perfil, {
    foreignKey: 'are_id',
    sourceKey: 'are_id'
});

Perfil.belongsTo(Area, {
    foreignKey: 'are_id',
    sourceKey: 'are_id'
});

/* agregado recien */

// una entidad puede tener muchas areas
// recion de uno a muchos
// TABLAS
// public.ent_entidades -> public.are_areas
Entidad.hasMany(Area, {
    foreignKey: 'ent_id',
});

Area.belongsTo(Entidad, {
    foreignKey: 'ent_id',
});

/* fin agregado recien */

/** TABLAS INTERMEDIAS */
// muchos perfiles pueden tener varios menus
// relacion muchos a muchos
// TABLA INTERMEDIA -> pem_perfil_menus
// DE perf_perfiles -> men_menus

Perfil.belongsToMany(Menu, {
    through: PerfilMenu,
    foreignKey: 'perf_id',
    // sourceKey: 'perf_id'
});

Menu.belongsToMany(Perfil, {
    through: PerfilMenu,
    foreignKey: 'men_id',
    // sourceKey: 'men_id'
});

// varios usuarios pueden tener pueden tener varios perfiles
// relacion muchos a muchos
// TABLA INTERMEDIA -> usp_usuario_perfiles
// DE usu_usuarios -> perf_perfiles
Usuario.belongsToMany(Perfil, {
    through: UsuarioPerfil,
    foreignKey: 'usu_id',
    // sourceKey: 'usu_id'
});

Perfil.belongsToMany(Usuario, {
    through: UsuarioPerfil,
    foreignKey: 'perf_id',
    // sourceKey: 'perf_id'
});


/** RELACIONES CON OTROS SCHEMA SEGUIMIENTO */
// relacion una institucion pertenece a una categoria "interno o externo"
// relacion uno a uno
// TABLAS
// ent_entidades -> tic_correspondencias