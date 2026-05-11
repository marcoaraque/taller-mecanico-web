import { createClient } from '@supabase/supabase-js'

// Reemplaza con tus datos reales de la pestaña API
const supabaseUrl = 'https://anazpunaauegeqtijxdt.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuYXpwdW5hYXVlZ2VxdGlqeGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjE0MjgsImV4cCI6MjA5NDA5NzQyOH0.jMtjcir4eO556WDvlCmKgEdgYvniW7SMd5Dw_mrqZzU' 

const supabase = createClient(supabaseUrl, supabaseKey)

async function registrarOrden(nombreCliente, nombreServicio, costoBase) {
    const impuesto = costoBase * 0.16; // El 16% que usó tu equipo en el C++
    const costoTotal = costoBase + impuesto;

    const { data, error } = await supabase
        .from('ORDENES') // El nombre de la tabla que acabas de crear
        .insert([
            { 
                CLIENTE: nombreCliente, 
                SERVICIO: nombreServicio, 
                SUBTOTAL: costoBase, 
                IVA: impuesto, 
                TOTAL: costoTotal 
            }
        ])

    if (error) {
        console.error('Error al guardar:', error.message)
    } else {
        console.log('¡Orden del taller guardada con éxito!')
    }
}

// Ejecutamos la función con una prueba
registrarOrden("Felipe", "Cambio de Aceite", 800)