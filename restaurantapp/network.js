const baseURL = 'http://localhost:5001';
const resturantId = '653565eadc380026cc70e790'

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


export async function getUser(id, token) {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Unauthorized');
      return { success: false, error: 'Unauthorized' };
    }

    const data = await response.json();
    if (data) return { success: true, data };
  } catch (error) {
    return { success: false, error: 'An error occurred' };
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

export async function getFood(token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    console.log("food", data)
    return data;
  } catch (error) {
    console.log(error)
    return null;
  }
}


export async function addFood(newFood, token) {
  try {

    const response = await fetch(`${baseURL}/restuarants/${resturantId}/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
        'Authorization': `Bearer ${token}`,
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


export async function deleteFood(id, token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}/foods/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to delete product');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}


export async function updateProfile(data, token) {
  try {
    console.log("Updating profile with data:", data);
    const response = await fetch(`${baseURL}/update/${data._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    console.log("Response from server:", response);

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error; // You can handle the error as needed in your component
  }
}

// Import necessary dependencies and configurations

export async function addOrder(order, token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}/orders`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    console.log("addOrder", response)

    if (!response.ok) {
      console.error('Error adding order to the restaurant.');
      return { success: false, error: 'Error adding order to the restaurant' };
    }

    const data = await response.json();
    if (data) return { success: true, data };
  } catch (error) {
    return { success: false, error: 'An error occurred' };
  }
}

export async function addToCart(restaurantId, foodId, token) {
  try {
    const response = await fetch(`${baseURL}/${restaurantId}/addToCart/${foodId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Error adding to cart.');
      return { success: false, error: 'Error adding to cart' };
    }

    const data = await response.json();
    if (data) return { success: true, data };
  } catch (error) {
    return { success: false, error: 'An error occurred' };
  }
}

export async function checkoutCart(restaurantId, token) {
  try {
    const response = await fetch(`${baseURL}/checkoutCart/${restaurantId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Error checking out the cart.');
      return { success: false, error: 'Error checking out the cart' };
    }

    const data = await response.json();
    if (data) return { success: true, data };
  } catch (error) {
    return { success: false, error: 'An error occurred' };
  }
}
