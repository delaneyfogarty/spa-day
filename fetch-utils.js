const SUPABASE_URL = '';
const SUPABASE_KEY = '';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


export async function fetchSpaEvents(){
  const response = await client
    .from('spa_events')
    .select(`*,
    spa_guests (*)`
    );

  return response;
}

export async function createSpaGuest(guest){
  const response = await client
    .from('spa_guests')
    .insert(guest);

  return response;
}


export async function deleteSpaGuest(id){
  const response = await client
    .from('spa_guests')
    .delete()
    .match({ id: id });

  return response;
}


export function getUser() {
  return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
  const user = getUser();

  if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
  if (getUser()) {
    location.replace('./spa-events');
  }
}

export async function signupUser(email, password) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

export async function logout() {
  await client.auth.signOut();

  return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
