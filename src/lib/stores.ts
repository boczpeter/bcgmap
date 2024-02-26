import { writable } from 'svelte/store'

export const act = writable(0), zoom = writable(18), type = writable('hybrid')
