const baseURL = 'http://localhost:5001';
const resturantId='6532df372a474e2233506e82'

const checkError = async (response, error) => {
  const responseData = await response.json();
  if (responseData.success) return responseData.data;
  throw new Error(error + responseData.error);
};

export async function signup(email, password) {
  try {
    const response = await fetch(`${baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Sign-up failed');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function login(email, password) {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default async function getFood(token) {
  try {
    console.log("get food called");
    const response = await fetch(`${baseURL}/restuarants/${resturantId}`, {
      method: 'GET',
      // headers: {
      //   'Authorization': `Bearer ${token}`,
      // },
    });
    //console.log(response);
    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();

    console.log("rau baicho",data.foods);

    return data;

  } catch (error) {
    console.log(error)
    return null;
  }
}

export async function getProduct(id, token) {
  try {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Unauthorized');
      return null;
    }

    const data = await response.json();
    if (data.success) return data.data;
  } catch (error) {
    return null;
  }
}

export async function addFood(newFood, token) {
  try {
    
    const response = await fetch(`${baseURL}/restuarants/${resturantId}/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newFood),
    });

    if (!response.ok) throw new Error('Failed to add product');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function editFood(newFood, token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}/foods/${newFood._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newFood),
    });

    if (!response.ok) throw new Error('Failed to edit product');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function updateProduct(id, data, token) {
  try {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to update product');

    return await checkError(response, 'UPDATE_PRODUCT:');
  } catch (error) {
    return null;
  }
}

export async function deleteFood(id, token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}/foods/${id}`, {
      method: 'DELETE',
      // headers: {
      //   'Authorization': `Bearer ${token}`,
      // },
    });

    if (!response.ok) throw new Error('Failed to delete product');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
