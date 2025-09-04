using UnityEngine;

public class AimAndShoot : MonoBehaviour
{
    [SerializeField] private Transform playerTransform, shootPosition;
    [SerializeField] private GameObject arrowPrefab;
    [SerializeField] private float aimSpeed;

    private Camera cam;
    private Vector2 mouseWorldPosition, direction;

    void Start()
    {
        cam = Camera.main;
    }

    void Update()
    {
        transform.position = playerTransform.position;
        Aim();
        Shoot();
    }

    private void Shoot()
    {
        if (Input.GetButtonDown("Fire1"))
        {
            GameObject arrow = Instantiate(arrowPrefab, shootPosition.position, transform.rotation);
            arrow.GetComponent<Arrow>().Launch(direction);
        }
    }

    private void Aim()
    {
        mouseWorldPosition = cam.ScreenToWorldPoint(Input.mousePosition);
        direction = (mouseWorldPosition - (Vector2)transform.position).normalized;
        transform.right = Vector2.MoveTowards(transform.right, direction, aimSpeed * Time.deltaTime);
    }
}
