SELECT cooks_en.id, cooks_en.name,cooks_en.category,cook_ingredients_en.value AS ingredient , pt.value AS preperation_time ,ptc.value AS cooking_time , pte.value AS enough_for FROM cooks_en
JOIN cook_ingredients_en ON cooks_en.id = cook_ingredients_en.cook_id 
JOIN (SELECT value , cook_id FROM `cook_informations_en` WHERE name LIKE '%Preparation%') AS pt
ON cooks_en.id = pt.cook_id
JOIN (SELECT value , cook_id FROM `cook_informations_en` WHERE name LIKE '%Cooking%') AS ptc
ON cooks_en.id = ptc.cook_id
JOIN (SELECT value , cook_id FROM `cook_informations_en` WHERE name LIKE '%Enough%') AS pte
ON cooks_en.id = pte.cook_id


CREATE TABLE cooks SELECT name,type,GROUP_CONCAT(DISTINCT value SEPARATOR '&') AS value  FROM `nlp_search`  GROUP BY name,type