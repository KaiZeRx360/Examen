class Catalogo {
    constructor() {
        this.peliculas = [];
        this.currentId = 0;
        this.catalogoElement = document.getElementById('catalogo');
        this.formElement = document.getElementById('pelicula-form');
        this.idElement = document.getElementById('pelicula-id');
        this.tituloElement = document.getElementById('titulo');
        this.directorElement = document.getElementById('director');
        this.anioElement = document.getElementById('anio');
        this.imagenElement = document.getElementById('imagen');

        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.guardarPelicula();
        });

        this.renderCatalogo();
    }

    agregarPelicula(titulo, director, anio, imagen) {
        const pelicula = { id: this.currentId++, titulo, director, anio, imagen };
        this.peliculas.push(pelicula);
        this.renderCatalogo();
    }

    editarPelicula(id, titulo, director, anio, imagen) {
        const pelicula = this.peliculas.find(p => p.id == id);
        if (pelicula) {
            pelicula.titulo = titulo;
            pelicula.director = director;
            pelicula.anio = anio;
            pelicula.imagen = imagen;
            this.renderCatalogo();
        }
    }

    eliminarPelicula(id) {
        this.peliculas = this.peliculas.filter(p => p.id != id);
        this.renderCatalogo();
    }

    obtenerPeliculas() {
        return this.peliculas;
    }

    renderCatalogo() {
        this.catalogoElement.innerHTML = '';
    
        this.peliculas.map(pelicula => {
            const row = document.createElement('tr');
    
            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = pelicula.imagen;
            img.alt = pelicula.titulo;
            imgCell.appendChild(img);
            row.appendChild(imgCell);
    
            const tituloCell = document.createElement('td');
            tituloCell.textContent = pelicula.titulo;
            row.appendChild(tituloCell);
    
            const directorCell = document.createElement('td');
            directorCell.textContent = pelicula.director;
            row.appendChild(directorCell);
    
            const anioCell = document.createElement('td');
            anioCell.textContent = pelicula.anio;
            row.appendChild(anioCell);
    
            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = "Editar";
            editButton.addEventListener('click', () => this.editarPeliculaForm(pelicula.id));
            actionsCell.appendChild(editButton);
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener('click', () => this.eliminarPelicula(pelicula.id));
            actionsCell.appendChild(deleteButton);
    
            row.appendChild(actionsCell);
    
            this.catalogoElement.appendChild(row);
        });
    }
    

    guardarPelicula() {
        const id = this.idElement.value;
        const titulo = this.tituloElement.value.trim();
        const director = this.directorElement.value.trim();
        const anio = this.anioElement.value.trim();
        const imagen = this.imagenElement.value.trim();

        if (!titulo || !director || !anio || !imagen) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (id) {
            this.editarPelicula(id, titulo, director, anio, imagen);
        } else {
            this.agregarPelicula(titulo, director, anio, imagen);
        }

        this.formElement.reset();
    }

    editarPeliculaForm(id) {
        const pelicula = this.peliculas.find(p => p.id == id);
        if (pelicula) {
            this.idElement.value = pelicula.id;
            this.tituloElement.value = pelicula.titulo;
            this.directorElement.value = pelicula.director;
            this.anioElement.value = pelicula.anio;
            this.imagenElement.value = pelicula.imagen;
        }
    }
}

const catalogo = new Catalogo();
