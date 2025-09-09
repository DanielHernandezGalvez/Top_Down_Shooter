using System.Collections;
using UnityEngine;

public class Healt : MonoBehaviour
{
    [SerializeField] GameObject explosionPrefab;
    [SerializeField] private HealthBar healthbar;
    [SerializeField] private int maxHealth;

    private SpriteRenderer spriteRenderer;

    private int health;
    void Start()
    {
        health = maxHealth;
        spriteRenderer = GetComponent<SpriteRenderer>();
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        Arrow arrow = collision.gameObject.GetComponent<Arrow>();
        if(arrow != null)
        {
            TakeDamage();

        }

    }
    private void TakeDamage()
    {
        health--;
        if (health <= 0)
        {
            Instantiate(explosionPrefab, transform.position, Quaternion.identity);
            Destroy(gameObject);
            GameManager.Instance.DecreaseEnemiesLeft();
        }
        else
        {
            healthbar.UpdateHealthBar(maxHealth, health);
            StartCoroutine(Blink(0.1f));
        }
    }
        private IEnumerator Blink(float blinkTime)
    {
        // cambiar el color a rojo,
        spriteRenderer.color = Color.red;
        // esperar
        yield return new WaitForSeconds(blinkTime);
        // y volver al color original
        spriteRenderer.color = Color.white;

    }


}
