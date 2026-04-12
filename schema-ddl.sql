CREATE TABLE [dbo].[Arbitro] (
    [idArbitro] int IDENTITY(1,1) NOT NULL,
    [idPersona] int NOT NULL,
    [estado] varchar(5) NOT NULL,
    [foto_perfil] varchar(2048) NULL,
    CONSTRAINT [PK_Arbitro] PRIMARY KEY ([idArbitro])
);
GO
ALTER TABLE [dbo].[Arbitro] WITH CHECK ADD CONSTRAINT [fk_Arbitro_Persona1] FOREIGN KEY ([idPersona]) REFERENCES [dbo].[Persona]([idPersona]);
ALTER TABLE [dbo].[Arbitro] CHECK CONSTRAINT [fk_Arbitro_Persona1];

CREATE TABLE [dbo].[Boleto] (
    [idBoleto] int IDENTITY(1,1) NOT NULL,
    [idEntrada] int NOT NULL,
    [idUsuario] int NOT NULL,
    [fecha_hora_registro] datetime NOT NULL,
    [asientos] int NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_Boleto] PRIMARY KEY ([idBoleto])
);
GO
ALTER TABLE [dbo].[Boleto] WITH CHECK ADD CONSTRAINT [fk_Boleto_Entrada1] FOREIGN KEY ([idEntrada]) REFERENCES [dbo].[Entrada]([idEntrada]);
ALTER TABLE [dbo].[Boleto] CHECK CONSTRAINT [fk_Boleto_Entrada1];
ALTER TABLE [dbo].[Boleto] WITH CHECK ADD CONSTRAINT [fk_Boleto_Usuario1] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]);
ALTER TABLE [dbo].[Boleto] CHECK CONSTRAINT [fk_Boleto_Usuario1];

CREATE TABLE [dbo].[CambioFormatoLiga] (
    [idCambioFormatoLiga] int NOT NULL,
    [idLiga] int NOT NULL,
    [idFormato] int NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_CambioFormatoLiga] PRIMARY KEY ([idCambioFormatoLiga])
);
GO
ALTER TABLE [dbo].[CambioFormatoLiga] WITH CHECK ADD CONSTRAINT [fk_CambioFormatoLiga_Formato1] FOREIGN KEY ([idFormato]) REFERENCES [dbo].[Formato]([idFormato]);
ALTER TABLE [dbo].[CambioFormatoLiga] CHECK CONSTRAINT [fk_CambioFormatoLiga_Formato1];
ALTER TABLE [dbo].[CambioFormatoLiga] WITH CHECK ADD CONSTRAINT [fk_CambioFormatoLiga_Liga1] FOREIGN KEY ([idLiga]) REFERENCES [dbo].[Liga]([idLiga]);
ALTER TABLE [dbo].[CambioFormatoLiga] CHECK CONSTRAINT [fk_CambioFormatoLiga_Liga1];

CREATE TABLE [dbo].[Ciudad] (
    [idCiudad] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [idPais] int NOT NULL,
    CONSTRAINT [PK_Ciudad] PRIMARY KEY ([idCiudad])
);
GO
ALTER TABLE [dbo].[Ciudad] WITH CHECK ADD CONSTRAINT [fk_Ciudad_Pais1] FOREIGN KEY ([idPais]) REFERENCES [dbo].[Pais]([idPais]);
ALTER TABLE [dbo].[Ciudad] CHECK CONSTRAINT [fk_Ciudad_Pais1];

CREATE TABLE [dbo].[Confederacion] (
    [idConfederacion] int IDENTITY(1,1) NOT NULL,
    [idDeporte] int NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_Confederacion] PRIMARY KEY ([idConfederacion])
);
GO
ALTER TABLE [dbo].[Confederacion] WITH CHECK ADD CONSTRAINT [fk_Confederacion_Deporte1] FOREIGN KEY ([idDeporte]) REFERENCES [dbo].[Deporte]([idDeporte]);
ALTER TABLE [dbo].[Confederacion] CHECK CONSTRAINT [fk_Confederacion_Deporte1];

CREATE TABLE [dbo].[DelegadoEquipo] (
    [idDelegadoEquipo] int IDENTITY(1,1) NOT NULL,
    [idUsuario] int NOT NULL,
    [idEquipo] int NOT NULL,
    [cargo] varchar(45) NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_DelegadoEquipo] PRIMARY KEY ([idDelegadoEquipo])
);
GO
ALTER TABLE [dbo].[DelegadoEquipo] WITH CHECK ADD CONSTRAINT [fk_DelegadoEquipo_Equipo1] FOREIGN KEY ([idEquipo]) REFERENCES [dbo].[Equipo]([idEquipo]);
ALTER TABLE [dbo].[DelegadoEquipo] CHECK CONSTRAINT [fk_DelegadoEquipo_Equipo1];
ALTER TABLE [dbo].[DelegadoEquipo] WITH CHECK ADD CONSTRAINT [fk_DelegadoEquipo_Usuario1] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]);
ALTER TABLE [dbo].[DelegadoEquipo] CHECK CONSTRAINT [fk_DelegadoEquipo_Usuario1];

CREATE TABLE [dbo].[DelegadoLiga] (
    [idDelegadoLiga] int IDENTITY(1,1) NOT NULL,
    [idUsuario] int NOT NULL,
    [idLiga] int NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_DelegadoLiga] PRIMARY KEY ([idDelegadoLiga])
);
GO
ALTER TABLE [dbo].[DelegadoLiga] WITH CHECK ADD CONSTRAINT [fk_DelegadoLiga_Liga1] FOREIGN KEY ([idLiga]) REFERENCES [dbo].[Liga]([idLiga]);
ALTER TABLE [dbo].[DelegadoLiga] CHECK CONSTRAINT [fk_DelegadoLiga_Liga1];
ALTER TABLE [dbo].[DelegadoLiga] WITH CHECK ADD CONSTRAINT [fk_DelegadoLiga_Usuario1] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]);
ALTER TABLE [dbo].[DelegadoLiga] CHECK CONSTRAINT [fk_DelegadoLiga_Usuario1];

CREATE TABLE [dbo].[Deporte] (
    [idDeporte] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [idGenero] int NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_Deporte] PRIMARY KEY ([idDeporte])
);
GO
ALTER TABLE [dbo].[Deporte] WITH CHECK ADD CONSTRAINT [fk_Deporte_Genero1] FOREIGN KEY ([idGenero]) REFERENCES [dbo].[Genero]([idGenero]);
ALTER TABLE [dbo].[Deporte] CHECK CONSTRAINT [fk_Deporte_Genero1];

CREATE TABLE [dbo].[Division] (
    [idDivision] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [idDeporte] int NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_Division] PRIMARY KEY ([idDivision])
);
GO
ALTER TABLE [dbo].[Division] WITH CHECK ADD CONSTRAINT [fk_Division_Deporte1] FOREIGN KEY ([idDeporte]) REFERENCES [dbo].[Deporte]([idDeporte]);
ALTER TABLE [dbo].[Division] CHECK CONSTRAINT [fk_Division_Deporte1];

CREATE TABLE [dbo].[Entrada] (
    [idEntrada] int IDENTITY(1,1) NOT NULL,
    [idPartido] int NOT NULL,
    [asientos] int NOT NULL,
    [precio] float NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_Entrada] PRIMARY KEY ([idEntrada])
);
GO
ALTER TABLE [dbo].[Entrada] WITH CHECK ADD CONSTRAINT [fk_Entrada_Partido1] FOREIGN KEY ([idPartido]) REFERENCES [dbo].[Partido]([idPartido]);
ALTER TABLE [dbo].[Entrada] CHECK CONSTRAINT [fk_Entrada_Partido1];

CREATE TABLE [dbo].[Entrenador] (
    [idEntrenador] int IDENTITY(1,1) NOT NULL,
    [idPersona] int NOT NULL,
    [foto_perfil] varchar(2048) NULL,
    [estado] varchar(45) NOT NULL,
    CONSTRAINT [PK_Entrenador] PRIMARY KEY ([idEntrenador])
);
GO
ALTER TABLE [dbo].[Entrenador] WITH CHECK ADD CONSTRAINT [fk_Entrenador_Persona1] FOREIGN KEY ([idPersona]) REFERENCES [dbo].[Persona]([idPersona]);
ALTER TABLE [dbo].[Entrenador] CHECK CONSTRAINT [fk_Entrenador_Persona1];

CREATE TABLE [dbo].[EntrenadorEquipo] (
    [idEntrenador] int NOT NULL,
    [idEquipo] int NOT NULL,
    [fecha_inicio] date NOT NULL,
    [fecha_fin] date NULL,
    CONSTRAINT [PK_EntrenadorEquipo] PRIMARY KEY ([idEntrenador], [idEquipo])
);
GO
ALTER TABLE [dbo].[EntrenadorEquipo] WITH CHECK ADD CONSTRAINT [fk_Entrenador_has_Equipo_Entrenador1] FOREIGN KEY ([idEntrenador]) REFERENCES [dbo].[Entrenador]([idEntrenador]);
ALTER TABLE [dbo].[EntrenadorEquipo] CHECK CONSTRAINT [fk_Entrenador_has_Equipo_Entrenador1];
ALTER TABLE [dbo].[EntrenadorEquipo] WITH CHECK ADD CONSTRAINT [fk_Entrenador_has_Equipo_Equipo1] FOREIGN KEY ([idEquipo]) REFERENCES [dbo].[Equipo]([idEquipo]);
ALTER TABLE [dbo].[EntrenadorEquipo] CHECK CONSTRAINT [fk_Entrenador_has_Equipo_Equipo1];

CREATE TABLE [dbo].[Equipo] (
    [idEquipo] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [estado] varchar(5) NOT NULL,
    [foto_perfil] varchar(2048) NULL,
    [idPais] int NOT NULL,
    [idDeporte] int NULL,
    CONSTRAINT [PK_Equipo] PRIMARY KEY ([idEquipo])
);
GO
ALTER TABLE [dbo].[Equipo] WITH CHECK ADD CONSTRAINT [FK_Equipo_Deporte] FOREIGN KEY ([idDeporte]) REFERENCES [dbo].[Deporte]([idDeporte]);
ALTER TABLE [dbo].[Equipo] CHECK CONSTRAINT [FK_Equipo_Deporte];
ALTER TABLE [dbo].[Equipo] WITH CHECK ADD CONSTRAINT [fk_Equipo_Pais1] FOREIGN KEY ([idPais]) REFERENCES [dbo].[Pais]([idPais]);
ALTER TABLE [dbo].[Equipo] CHECK CONSTRAINT [fk_Equipo_Pais1];

CREATE TABLE [dbo].[EquipoLiga] (
    [idEquipo] int NOT NULL,
    [idLiga] int NOT NULL,
    [fecha_inicio] date NOT NULL,
    [fecha_fin] int NULL,
    CONSTRAINT [PK_EquipoLiga] PRIMARY KEY ([idEquipo], [idLiga], [fecha_inicio])
);
GO
ALTER TABLE [dbo].[EquipoLiga] WITH CHECK ADD CONSTRAINT [fk_Equipo_has_Liga_Equipo1] FOREIGN KEY ([idEquipo]) REFERENCES [dbo].[Equipo]([idEquipo]);
ALTER TABLE [dbo].[EquipoLiga] CHECK CONSTRAINT [fk_Equipo_has_Liga_Equipo1];
ALTER TABLE [dbo].[EquipoLiga] WITH CHECK ADD CONSTRAINT [fk_Equipo_has_Liga_Liga1] FOREIGN KEY ([idLiga]) REFERENCES [dbo].[Liga]([idLiga]);
ALTER TABLE [dbo].[EquipoLiga] CHECK CONSTRAINT [fk_Equipo_has_Liga_Liga1];

CREATE TABLE [dbo].[Estadio] (
    [idEstadio] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [idCiudad] int NOT NULL,
    [asientos] int NOT NULL,
    [estado] varchar(45) NOT NULL,
    CONSTRAINT [PK_Estadio] PRIMARY KEY ([idEstadio])
);
GO
ALTER TABLE [dbo].[Estadio] WITH CHECK ADD CONSTRAINT [fk_Estadio_Ciudad1] FOREIGN KEY ([idCiudad]) REFERENCES [dbo].[Ciudad]([idCiudad]);
ALTER TABLE [dbo].[Estadio] CHECK CONSTRAINT [fk_Estadio_Ciudad1];

CREATE TABLE [dbo].[EventoPartido] (
    [idEventoPartido] int IDENTITY(1,1) NOT NULL,
    [idPartido] int NOT NULL,
    [idEquipo] int NOT NULL,
    [idJugador] int NULL,
    [idTipoEvento] int NOT NULL,
    [idTablaPosicion] int NULL,
    CONSTRAINT [PK_EventoPartido] PRIMARY KEY ([idEventoPartido])
);
GO
ALTER TABLE [dbo].[EventoPartido] WITH CHECK ADD CONSTRAINT [fk_EventoPartido_Equipo1] FOREIGN KEY ([idEquipo]) REFERENCES [dbo].[Equipo]([idEquipo]);
ALTER TABLE [dbo].[EventoPartido] CHECK CONSTRAINT [fk_EventoPartido_Equipo1];
ALTER TABLE [dbo].[EventoPartido] WITH CHECK ADD CONSTRAINT [fk_EventoPartido_Jugador1] FOREIGN KEY ([idJugador]) REFERENCES [dbo].[Jugador]([idJugador]);
ALTER TABLE [dbo].[EventoPartido] CHECK CONSTRAINT [fk_EventoPartido_Jugador1];
ALTER TABLE [dbo].[EventoPartido] WITH CHECK ADD CONSTRAINT [fk_EventoPartido_Partido1] FOREIGN KEY ([idPartido]) REFERENCES [dbo].[Partido]([idPartido]);
ALTER TABLE [dbo].[EventoPartido] CHECK CONSTRAINT [fk_EventoPartido_Partido1];
ALTER TABLE [dbo].[EventoPartido] WITH CHECK ADD CONSTRAINT [fk_EventoPartido_TablaPosicion1] FOREIGN KEY ([idTablaPosicion]) REFERENCES [dbo].[TablaPosicion]([idTablaPosicion]);
ALTER TABLE [dbo].[EventoPartido] CHECK CONSTRAINT [fk_EventoPartido_TablaPosicion1];
ALTER TABLE [dbo].[EventoPartido] WITH CHECK ADD CONSTRAINT [fk_EventoPartido_TipoEvento1] FOREIGN KEY ([idTipoEvento]) REFERENCES [dbo].[TipoEvento]([idTipoEvento]);
ALTER TABLE [dbo].[EventoPartido] CHECK CONSTRAINT [fk_EventoPartido_TipoEvento1];

CREATE TABLE [dbo].[Factura] (
    [idFactura] int IDENTITY(1,1) NOT NULL,
    [idBoleto] int NOT NULL,
    [fecha_hora_registro] datetime NOT NULL,
    [subtotal] float NOT NULL,
    [impuesto] float NOT NULL,
    [total] float NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_Factura] PRIMARY KEY ([idFactura])
);
GO
ALTER TABLE [dbo].[Factura] WITH CHECK ADD CONSTRAINT [fk_Factura_Boleto1] FOREIGN KEY ([idBoleto]) REFERENCES [dbo].[Boleto]([idBoleto]);
ALTER TABLE [dbo].[Factura] CHECK CONSTRAINT [fk_Factura_Boleto1];

CREATE TABLE [dbo].[Formato] (
    [idFormato] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [estado] varchar(45) NOT NULL,
    CONSTRAINT [PK_Formato] PRIMARY KEY ([idFormato])
);
GO

CREATE TABLE [dbo].[Genero] (
    [idGenero] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    CONSTRAINT [PK_Genero] PRIMARY KEY ([idGenero])
);
GO

CREATE TABLE [dbo].[Grupo] (
    [idGrupo] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [estado] varchar(45) NOT NULL,
    CONSTRAINT [PK_Grupo] PRIMARY KEY ([idGrupo])
);
GO

CREATE TABLE [dbo].[Jugador] (
    [idJugador] int IDENTITY(1,1) NOT NULL,
    [idPersona] int NOT NULL,
    [posicion] varchar(20) NOT NULL,
    [foto_perfil] varchar(2048) NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_Jugador] PRIMARY KEY ([idJugador])
);
GO
ALTER TABLE [dbo].[Jugador] WITH CHECK ADD CONSTRAINT [fk_Jugador_Persona1] FOREIGN KEY ([idPersona]) REFERENCES [dbo].[Persona]([idPersona]);
ALTER TABLE [dbo].[Jugador] CHECK CONSTRAINT [fk_Jugador_Persona1];

CREATE TABLE [dbo].[JugadorEquipo] (
    [idJugador] int NOT NULL,
    [idEquipo] int NOT NULL,
    [idLiga] int NOT NULL,
    [fecha_inicio] date NOT NULL,
    [fecha_fin] date NULL,
    CONSTRAINT [PK_JugadorEquipo] PRIMARY KEY ([idJugador], [idEquipo])
);
GO
ALTER TABLE [dbo].[JugadorEquipo] WITH CHECK ADD CONSTRAINT [fk_JugadorEquipo_Liga1] FOREIGN KEY ([idLiga]) REFERENCES [dbo].[Liga]([idLiga]);
ALTER TABLE [dbo].[JugadorEquipo] CHECK CONSTRAINT [fk_JugadorEquipo_Liga1];
ALTER TABLE [dbo].[JugadorEquipo] WITH CHECK ADD CONSTRAINT [fk_Jugador_has_Equipo_Equipo1] FOREIGN KEY ([idEquipo]) REFERENCES [dbo].[Equipo]([idEquipo]);
ALTER TABLE [dbo].[JugadorEquipo] CHECK CONSTRAINT [fk_Jugador_has_Equipo_Equipo1];
ALTER TABLE [dbo].[JugadorEquipo] WITH CHECK ADD CONSTRAINT [fk_Jugador_has_Equipo_Jugador1] FOREIGN KEY ([idJugador]) REFERENCES [dbo].[Jugador]([idJugador]);
ALTER TABLE [dbo].[JugadorEquipo] CHECK CONSTRAINT [fk_Jugador_has_Equipo_Jugador1];

CREATE TABLE [dbo].[Liga] (
    [idLiga] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [idDeporte] int NOT NULL,
    [idDivision] int NOT NULL,
    [idPais] int NOT NULL,
    [foto_perfil] varchar(2048) NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_Liga] PRIMARY KEY ([idLiga])
);
GO
ALTER TABLE [dbo].[Liga] WITH CHECK ADD CONSTRAINT [fk_Liga_Deporte1] FOREIGN KEY ([idDeporte]) REFERENCES [dbo].[Deporte]([idDeporte]);
ALTER TABLE [dbo].[Liga] CHECK CONSTRAINT [fk_Liga_Deporte1];
ALTER TABLE [dbo].[Liga] WITH CHECK ADD CONSTRAINT [fk_Liga_Division1] FOREIGN KEY ([idDivision]) REFERENCES [dbo].[Division]([idDivision]);
ALTER TABLE [dbo].[Liga] CHECK CONSTRAINT [fk_Liga_Division1];
ALTER TABLE [dbo].[Liga] WITH CHECK ADD CONSTRAINT [fk_Liga_Pais1] FOREIGN KEY ([idPais]) REFERENCES [dbo].[Pais]([idPais]);
ALTER TABLE [dbo].[Liga] CHECK CONSTRAINT [fk_Liga_Pais1];

CREATE TABLE [dbo].[LigaTemporada] (
    [idLiga] int NOT NULL,
    [idTemporada] int NOT NULL,
    [idFormato] int NOT NULL,
    CONSTRAINT [PK_LigaTemporada] PRIMARY KEY ([idLiga], [idTemporada])
);
GO
ALTER TABLE [dbo].[LigaTemporada] WITH CHECK ADD CONSTRAINT [fk_LigaTemporada_Formato1] FOREIGN KEY ([idFormato]) REFERENCES [dbo].[Formato]([idFormato]);
ALTER TABLE [dbo].[LigaTemporada] CHECK CONSTRAINT [fk_LigaTemporada_Formato1];
ALTER TABLE [dbo].[LigaTemporada] WITH CHECK ADD CONSTRAINT [fk_Liga_has_Temporada_Liga1] FOREIGN KEY ([idLiga]) REFERENCES [dbo].[Liga]([idLiga]);
ALTER TABLE [dbo].[LigaTemporada] CHECK CONSTRAINT [fk_Liga_has_Temporada_Liga1];
ALTER TABLE [dbo].[LigaTemporada] WITH CHECK ADD CONSTRAINT [fk_Liga_has_Temporada_Temporada1] FOREIGN KEY ([idTemporada]) REFERENCES [dbo].[Temporada]([idTemporada]);
ALTER TABLE [dbo].[LigaTemporada] CHECK CONSTRAINT [fk_Liga_has_Temporada_Temporada1];

CREATE TABLE [dbo].[Pais] (
    [idPais] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    CONSTRAINT [PK_Pais] PRIMARY KEY ([idPais])
);
GO

CREATE TABLE [dbo].[Partido] (
    [idPartido] int IDENTITY(1,1) NOT NULL,
    [idEquipoLocal] int NOT NULL,
    [idEquipoVisitante] int NOT NULL,
    [idLiga] int NULL,
    [idTemporada] int NULL,
    [fecha_hora_partido] datetime NOT NULL,
    [idEstadio] int NOT NULL,
    [estado] varchar(5) NOT NULL,
    CONSTRAINT [PK_Partido] PRIMARY KEY ([idPartido])
);
GO
ALTER TABLE [dbo].[Partido] WITH CHECK ADD CONSTRAINT [fk_Partido_Equipo1] FOREIGN KEY ([idEquipoLocal]) REFERENCES [dbo].[Equipo]([idEquipo]);
ALTER TABLE [dbo].[Partido] CHECK CONSTRAINT [fk_Partido_Equipo1];
ALTER TABLE [dbo].[Partido] WITH CHECK ADD CONSTRAINT [fk_Partido_Equipo2] FOREIGN KEY ([idEquipoVisitante]) REFERENCES [dbo].[Equipo]([idEquipo]);
ALTER TABLE [dbo].[Partido] CHECK CONSTRAINT [fk_Partido_Equipo2];
ALTER TABLE [dbo].[Partido] WITH CHECK ADD CONSTRAINT [fk_Partido_Estadio1] FOREIGN KEY ([idEstadio]) REFERENCES [dbo].[Estadio]([idEstadio]);
ALTER TABLE [dbo].[Partido] CHECK CONSTRAINT [fk_Partido_Estadio1];
ALTER TABLE [dbo].[Partido] WITH CHECK ADD CONSTRAINT [fk_Partido_Liga1] FOREIGN KEY ([idLiga]) REFERENCES [dbo].[Liga]([idLiga]);
ALTER TABLE [dbo].[Partido] CHECK CONSTRAINT [fk_Partido_Liga1];
ALTER TABLE [dbo].[Partido] WITH CHECK ADD CONSTRAINT [fk_Partido_Temporada1] FOREIGN KEY ([idTemporada]) REFERENCES [dbo].[Temporada]([idTemporada]);
ALTER TABLE [dbo].[Partido] CHECK CONSTRAINT [fk_Partido_Temporada1];

CREATE TABLE [dbo].[PartidoArbitro] (
    [idPartido] int NOT NULL,
    [idArbitro] int NOT NULL,
    [idTipoArbitro] int NOT NULL,
    CONSTRAINT [PK_PartidoArbitro] PRIMARY KEY ([idPartido], [idArbitro])
);
GO
ALTER TABLE [dbo].[PartidoArbitro] WITH CHECK ADD CONSTRAINT [fk_PartidoArbitro_TipoArbitro1] FOREIGN KEY ([idTipoArbitro]) REFERENCES [dbo].[TipoArbitro]([idTipoArbitro]);
ALTER TABLE [dbo].[PartidoArbitro] CHECK CONSTRAINT [fk_PartidoArbitro_TipoArbitro1];
ALTER TABLE [dbo].[PartidoArbitro] WITH CHECK ADD CONSTRAINT [fk_Partido_has_Arbitro_Arbitro1] FOREIGN KEY ([idArbitro]) REFERENCES [dbo].[Arbitro]([idArbitro]);
ALTER TABLE [dbo].[PartidoArbitro] CHECK CONSTRAINT [fk_Partido_has_Arbitro_Arbitro1];
ALTER TABLE [dbo].[PartidoArbitro] WITH CHECK ADD CONSTRAINT [fk_Partido_has_Arbitro_Partido1] FOREIGN KEY ([idPartido]) REFERENCES [dbo].[Partido]([idPartido]);
ALTER TABLE [dbo].[PartidoArbitro] CHECK CONSTRAINT [fk_Partido_has_Arbitro_Partido1];

CREATE TABLE [dbo].[Persona] (
    [idPersona] int IDENTITY(1,1) NOT NULL,
    [pnombre] varchar(45) NOT NULL,
    [snombre] varchar(45) NOT NULL,
    [papellido] varchar(45) NOT NULL,
    [sapellido] varchar(45) NOT NULL,
    [dni] varchar(20) NULL,
    [idGenero] int NOT NULL,
    [direccion] varchar(45) NULL,
    [idPais] int NOT NULL,
    [edad] int NULL,
    CONSTRAINT [PK_Persona] PRIMARY KEY ([idPersona])
);
GO
ALTER TABLE [dbo].[Persona] WITH CHECK ADD CONSTRAINT [fk_Persona_Genero1] FOREIGN KEY ([idGenero]) REFERENCES [dbo].[Genero]([idGenero]);
ALTER TABLE [dbo].[Persona] CHECK CONSTRAINT [fk_Persona_Genero1];
ALTER TABLE [dbo].[Persona] WITH CHECK ADD CONSTRAINT [fk_Persona_Pais1] FOREIGN KEY ([idPais]) REFERENCES [dbo].[Pais]([idPais]);
ALTER TABLE [dbo].[Persona] CHECK CONSTRAINT [fk_Persona_Pais1];

CREATE TABLE [dbo].[TablaPosicion] (
    [idTablaPosicion] int IDENTITY(1,1) NOT NULL,
    [idEquipo] int NOT NULL,
    [idLiga] int NOT NULL,
    [idTemporada] int NOT NULL,
    [pj] int NOT NULL,
    [pg] int NOT NULL,
    [pe] int NOT NULL,
    [pp] int NOT NULL,
    [af] int NOT NULL,
    [ac] int NOT NULL,
    [da] int NOT NULL,
    [pts] int NULL,
    [idDivision] int NULL,
    [idConfederacion] int NULL,
    [pct] float NULL,
    CONSTRAINT [PK_TablaPosicion] PRIMARY KEY ([idTablaPosicion])
);
GO
ALTER TABLE [dbo].[TablaPosicion] WITH CHECK ADD CONSTRAINT [fk_TablaPosicion_Confederacion1] FOREIGN KEY ([idConfederacion]) REFERENCES [dbo].[Confederacion]([idConfederacion]);
ALTER TABLE [dbo].[TablaPosicion] CHECK CONSTRAINT [fk_TablaPosicion_Confederacion1];
ALTER TABLE [dbo].[TablaPosicion] WITH CHECK ADD CONSTRAINT [fk_TablaPosicion_Division1] FOREIGN KEY ([idDivision]) REFERENCES [dbo].[Division]([idDivision]);
ALTER TABLE [dbo].[TablaPosicion] CHECK CONSTRAINT [fk_TablaPosicion_Division1];
ALTER TABLE [dbo].[TablaPosicion] WITH CHECK ADD CONSTRAINT [fk_TablaPosicion_Equipo1] FOREIGN KEY ([idEquipo]) REFERENCES [dbo].[Equipo]([idEquipo]);
ALTER TABLE [dbo].[TablaPosicion] CHECK CONSTRAINT [fk_TablaPosicion_Equipo1];
ALTER TABLE [dbo].[TablaPosicion] WITH CHECK ADD CONSTRAINT [fk_TablaPosicion_Liga1] FOREIGN KEY ([idLiga]) REFERENCES [dbo].[Liga]([idLiga]);
ALTER TABLE [dbo].[TablaPosicion] CHECK CONSTRAINT [fk_TablaPosicion_Liga1];
ALTER TABLE [dbo].[TablaPosicion] WITH CHECK ADD CONSTRAINT [fk_TablaPosicion_Temporada1] FOREIGN KEY ([idTemporada]) REFERENCES [dbo].[Temporada]([idTemporada]);
ALTER TABLE [dbo].[TablaPosicion] CHECK CONSTRAINT [fk_TablaPosicion_Temporada1];

CREATE TABLE [dbo].[Telefono] (
    [idTelefono] int IDENTITY(1,1) NOT NULL,
    [numero] varchar(20) NOT NULL,
    [idPersona] int NOT NULL,
    CONSTRAINT [PK_Telefono] PRIMARY KEY ([idTelefono])
);
GO
ALTER TABLE [dbo].[Telefono] WITH CHECK ADD CONSTRAINT [fk_Telefono_Persona] FOREIGN KEY ([idPersona]) REFERENCES [dbo].[Persona]([idPersona]);
ALTER TABLE [dbo].[Telefono] CHECK CONSTRAINT [fk_Telefono_Persona];

CREATE TABLE [dbo].[Temporada] (
    [idTemporada] int IDENTITY(1,1) NOT NULL,
    [fecha_inicio] date NOT NULL,
    [fecha_fin] date NOT NULL,
    [idDeporte] int NOT NULL,
    CONSTRAINT [PK_Temporada] PRIMARY KEY ([idTemporada])
);
GO
ALTER TABLE [dbo].[Temporada] WITH CHECK ADD CONSTRAINT [fk_Temporada_Deporte1] FOREIGN KEY ([idDeporte]) REFERENCES [dbo].[Deporte]([idDeporte]);
ALTER TABLE [dbo].[Temporada] CHECK CONSTRAINT [fk_Temporada_Deporte1];

CREATE TABLE [dbo].[TipoArbitro] (
    [idTipoArbitro] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [idDeporte] int NOT NULL,
    [estado] varchar(45) NOT NULL,
    CONSTRAINT [PK_TipoArbitro] PRIMARY KEY ([idTipoArbitro])
);
GO
ALTER TABLE [dbo].[TipoArbitro] WITH CHECK ADD CONSTRAINT [fk_TipoArbitro_Deporte1] FOREIGN KEY ([idDeporte]) REFERENCES [dbo].[Deporte]([idDeporte]);
ALTER TABLE [dbo].[TipoArbitro] CHECK CONSTRAINT [fk_TipoArbitro_Deporte1];

CREATE TABLE [dbo].[TipoEvento] (
    [idTipoEvento] int IDENTITY(1,1) NOT NULL,
    [nombre] varchar(45) NOT NULL,
    [idDeporte] int NOT NULL,
    CONSTRAINT [PK_TipoEvento] PRIMARY KEY ([idTipoEvento])
);
GO
ALTER TABLE [dbo].[TipoEvento] WITH CHECK ADD CONSTRAINT [fk_TipoEvento_Deporte1] FOREIGN KEY ([idDeporte]) REFERENCES [dbo].[Deporte]([idDeporte]);
ALTER TABLE [dbo].[TipoEvento] CHECK CONSTRAINT [fk_TipoEvento_Deporte1];

CREATE TABLE [dbo].[Usuario] (
    [idUsuario] int IDENTITY(1,1) NOT NULL,
    [correo] varchar(255) NOT NULL,
    [password] varchar(250) NOT NULL,
    [idPersona] int NOT NULL,
    [rol] varchar(10) NOT NULL,
    [foto_perfil] varchar(2048) NULL,
    [estado] varchar(5) NOT NULL,
    [fecha_hora_registro] datetime NOT NULL,
    CONSTRAINT [PK_Usuario] PRIMARY KEY ([idUsuario])
);
GO
ALTER TABLE [dbo].[Usuario] WITH CHECK ADD CONSTRAINT [fk_Usuario_Persona1] FOREIGN KEY ([idPersona]) REFERENCES [dbo].[Persona]([idPersona]);
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [fk_Usuario_Persona1];
