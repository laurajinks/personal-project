SELECT * FROM pending_animal
LEFT JOIN animal ON animal.animal_id = pending_animal.animal_id
LEFT JOIN users ON users.user_id = pending_animal.user_id
WHERE pending_animal.org_id = $1;