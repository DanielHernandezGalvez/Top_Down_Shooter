using UnityEngine;

public class EnemyMovement : MonoBehaviour
{
    [SerializeField] private float speed;
    private Transform playerTransform;
    private bool isFacingRight = true;

    void Start()
    {
        playerTransform = FindAnyObjectByType<PlayerMovement>().transform;
    }

    void Update()
    {
        Follow();

        Flip();
    }

    private void Follow()
    {
        Vector2 playerDirection = (playerTransform.position - transform.position).normalized;
        transform.Translate(playerDirection * speed * Time.deltaTime);
    }

    private void Flip()
    {
        bool isPlayerRight = playerTransform.position.x > transform.position.x;

        if ((isFacingRight && !isPlayerRight) || (!isFacingRight && isPlayerRight))
        {
            Vector3 scale = transform.localScale;
            scale.x *= -1f;
            transform.localScale = scale;
            isFacingRight = !isFacingRight;
        }
    }
}
